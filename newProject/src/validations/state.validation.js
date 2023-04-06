const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createState = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3),
    countryId: Joi.number(),
  }),
};

const getStates = {
  query: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
    countryId: Joi.number(),
    limit: Joi.number().integer(),
    sortBy: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getState = {
  params: Joi.object().keys({
    stateId: Joi.number(),
  }),
};

const updateState = {
  params: Joi.object().keys({
    stateId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      countryId: Joi.number(),
    })
    .min(1),
};

const deleteState = {
  params: Joi.object().keys({
    stateId: Joi.number(),
  }),
};

module.exports = {
  createState,
  getStates,
  getState,
  updateState,
  deleteState,
};
