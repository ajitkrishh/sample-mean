const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createCountry = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3),
  }),
};

const getCountrys = {
  query: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
    limit: Joi.number().integer(),
    sortBy: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getCountry = {
  params: Joi.object().keys({
    countryId: Joi.number(),
  }),
};

const updateCountry = {
  params: Joi.object().keys({
    countryId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteCountry = {
  params: Joi.object().keys({
    countryId: Joi.number(),
  }),
};

module.exports = {
  createCountry,
  getCountrys,
  getCountry,
  updateCountry,
  deleteCountry,
};
