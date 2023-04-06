const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { locationHelperService } = require('../services');

const createCity = catchAsync(async (req, res) => {
  const city = await locationHelperService.createCity(req.body);
  res.status(httpStatus.CREATED).send(city);
});

const getCitys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','stateId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await locationHelperService.queryCitys(filter, options);
  res.send(result);
});

const getCity = catchAsync(async (req, res) => {
  const city = await locationHelperService.getCityById(req.params.cityId);
  if (!city) {
    throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
  }
  res.send(city);
});

const updateCity = catchAsync(async (req, res) => {
  const city = await locationHelperService.updateCityById(req.params.cityId, req.body);
  res.send(city);
});

const deleteCity = catchAsync(async (req, res) => {
  await locationHelperService.deleteCityById(req.params.cityId);
  res.status(httpStatus.OK).send({message: 'city deleted.'});
});

module.exports = {
  createCity,
  getCitys,
  getCity,
  updateCity,
  deleteCity,
};
