const httpStatus = require('http-status');
const { Location} = require('../models');
const ApiError = require('../utils/ApiError');
const {detailedLocation} = require("../models/location.helper.model")


const createLocation = async (locationBody) => {
  if (await Location.isPincodeTaken(locationBody.pincode)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pincode already taken');
  }
  return Location.create(locationBody);
};


const queryLocations = async (filter, options) => {
  const locations = await Location.paginate(filter, options);
  return locations;
};

const getLocationById = async (id) => {
  return Location.findById(id);
};
const getDetailedLocationById = async (id) => {
  
  return detailedLocation.findById(id);
};
const pipeline = [
  {
    '$project': {
      '_id': 1, 
      'address': 1, 
      'pincode': 1, 
      'cityId': 1
    }
  }, {
    '$lookup': {
      'from': 'cities', 
      'localField': 'cityId', 
      'foreignField': '_id', 
      'as': 'city'
    }
  }, {
    '$unwind': '$city'
  }, {
    '$lookup': {
      'from': 'states', 
      'localField': 'city.stateId', 
      'foreignField': '_id', 
      'as': 'state'
    }
  }, {
    '$unwind': '$state'
  }, {
    '$lookup': {
      'from': 'countries', 
      'localField': 'state.countryId', 
      'foreignField': '_id', 
      'as': 'country'
    }
  }, {
    '$unwind': '$country'
  }, {
    '$project': {
      'city.createdAt': 0, 
      'state.createdAt': 0, 
      'country.createdAt': 0, 
      'city.updatedAt': 0, 
      'state.updatedAt': 0, 
      'country.updatedAt': 0, 
      'city.__v': 0, 
      'state.__v': 0, 
      'country.__v': 0
    }
  }
]

const getDetailedLocation = async () =>{
  let aggCursor = Location.aggregate(pipeline) 
  return aggCursor
}


const updateLocationById = async (locationId, updateBody) => {
  const location = await getLocationById(locationId);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  if (updateBody.pincode && (await Location.isPincodeTaken(updateBody.pincode, locationId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pincode already taken');
  }
  Object.assign(location, updateBody);
  await location.save();
  return location;
};

const deleteLocationById = async (locationId) => {
  const location = await getLocationById(locationId);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'location not found');
  }
  await location.remove();
  return location;
};

module.exports = {
  createLocation,
  queryLocations,
  getLocationById,
  getDetailedLocation,
  updateLocationById,
  deleteLocationById,
  getDetailedLocationById
};
