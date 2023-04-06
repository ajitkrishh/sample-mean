const Joi = require('joi');
// const { objectId } = require('./custom.validation');


const createLocation = {
  body: Joi.object().keys({
    address: Joi.string(),
    cityId: Joi.number().required(),
    // state: Joi.number().required(),
    // country: Joi.number().required(),
    pincode: Joi.string().regex(/^\d{6}$/).required().length(6),
  }),
};

const getLocations = {
  query: Joi.object().keys({
    id : Joi.number() ,
    cityId: Joi.number(),
    address: Joi.string(),
    // state: Joi.number(),
    // country: Joi.number(),
    pincode: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLocation = {
  params: Joi.object().keys({
    // locationId: Joi.string().custom(objectId),
    locationId: Joi.number(),
  }),
};

const updateLocation = {
  params: Joi.object().keys({
    locationId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      address: Joi.string(),
      cityId: Joi.number().required(),
      // state: Joi.number().required(),
      // country: Joi.number().required(),
      pincode: Joi.string().regex(/^\d{6}$/).required().length(6),
    })
    .min(1),
};

const deleteLocation = {
  params: Joi.object().keys({
    locationId: Joi.number(),
  }),
};

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
