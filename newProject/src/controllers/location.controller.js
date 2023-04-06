const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { locationService } = require('../services');

const createLocation = catchAsync(async (req, res) => {
  const location = await locationService.createLocation(req.body);
  res.status(httpStatus.CREATED).send(location);
});

const getLocations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['address','cityId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await locationService.queryLocations(filter, options);
  res.send(result);
});
const getDetailedLocations = catchAsync(async (req, res) => {
  const result = await locationService.getDetailedLocation();
  res.send(result);
});

const getDetailedLocationById = catchAsync(async (req, res) => {
  console.log(req.params.locationId);
  const location = await locationService.getDetailedLocationById(req.params.locationId);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  res.send(location);
});
const getLocation = catchAsync(async (req, res) => {
  const location = await locationService.getLocationById(req.params.locationId);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  res.send(location);
});

const updateLocation = catchAsync(async (req, res) => {
  const location = await locationService.updateLocationById(req.params.locationId, req.body);
  res.send(location);
});

const deleteLocation = catchAsync(async (req, res) => {
  await locationService.deleteLocationById(req.params.locationId);
  res.status(httpStatus.OK).send({message: 'location deleted.'});
});

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  getDetailedLocations,
  updateLocation,
  deleteLocation,
  getDetailedLocationById
};
