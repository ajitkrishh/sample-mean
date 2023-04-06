const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { locationHelperService } = require('../services');

const createCountry = catchAsync(async (req, res) => {
  const country = await locationHelperService.createCountry(req.body);
  res.status(httpStatus.CREATED).send(country);
});

const getCountrys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name',]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await locationHelperService.queryCountrys(filter, options);
  res.send(result);
});

const getCountry = catchAsync(async (req, res) => {
  const country = await locationHelperService.getCountryById(req.params.countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  res.send(country);
});

const updateCountry = catchAsync(async (req, res) => {
  const country = await locationHelperService.updateCountryById(req.params.countryId, req.body);
  res.send(country);
});

const deleteCountry = catchAsync(async (req, res) => {
  await locationHelperService.deleteCountryById(req.params.countryId);
  res.status(httpStatus.OK).send({message: 'country deleted.'});
});

module.exports = {
  createCountry,
  getCountrys,
  getCountry,
  updateCountry,
  deleteCountry,
};
