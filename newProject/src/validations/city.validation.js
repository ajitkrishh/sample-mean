const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createCity = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3),
    stateId: Joi.number(),
  }),
};

const getCitys = {
  query: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
    stateId: Joi.number(),
    limit: Joi.number().integer(),
    sortBy: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getCity = {
  params: Joi.object().keys({
    cityId: Joi.number(),
  }),
};

const updateCity = {
  params: Joi.object().keys({
    cityId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      stateId: Joi.number(),
    })
    .min(1),
};

const deleteCity = {
  params: Joi.object().keys({
    cityId: Joi.number(),
  }),
};

module.exports = {
  createCity,
  getCitys,
  getCity,
  updateCity,
  deleteCity,
};
