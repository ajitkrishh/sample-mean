const Joi = require('joi');
// const { objectId } = require('./custom.validation');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { locationHelperService } = require('../services');

const createState = catchAsync(async (req, res) => {
  const state = await locationHelperService.createState(req.body);
  res.status(httpStatus.CREATED).send(state);
});

const getStates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','countryId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await locationHelperService.queryStates(filter, options);
  res.send(result);
});

const getState = catchAsync(async (req, res) => {
  const state = await locationHelperService.getStateById(req.params.stateId);
  if (!state) {
    throw new ApiError(httpStatus.NOT_FOUND, 'State not found');
  }
  res.send(state);
});

const updateState = catchAsync(async (req, res) => {
  const state = await locationHelperService.updateStateById(req.params.stateId, req.body);
  res.send(state);
});

const deleteState = catchAsync(async (req, res) => {
  await locationHelperService.deleteStateById(req.params.stateId);
  res.status(httpStatus.OK).send({message: 'state deleted.'});
});

module.exports = {
  createState,
  getStates,
  getState,
  updateState,
  deleteState,
};

