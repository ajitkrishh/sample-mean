const httpStatus = require('http-status');
const { City,State,Country } = require('../models/location.helper.model')
const ApiError = require('../utils/ApiError');


const createCity = async (cityBody) => {
  return City.create(cityBody);
};


const queryCitys = async (filter, options) => {
  const citys = await City.paginate(filter, options);
  return citys;
};

const getCityById = async (id) => {
  return City.findById(id);
};


const updateCityById = async (cityId, updateBody) => {
  const city = await getCityById(cityId);
  if (!city) {
    throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
  }
  
  Object.assign(city, updateBody);
  await city.save();
  return city;
};

const deleteCityById = async (cityId) => {
  const city = await getCityById(cityId);
  if (!city) {
    throw new ApiError(httpStatus.NOT_FOUND, 'city not found');
  }
  await city.remove();
  return city;
};
// -------------------------------------------------------------------
const createState = async (stateBody) => {
  
  return State.create(stateBody);
};


const queryStates = async (filter, options) => {
  const states = await State.paginate(filter, options);
  return states;
};

const getStateById = async (id) => {
  return State.findById(id);
};


const updateStateById = async (stateId, updateBody) => {
  const state = await getStateById(stateId);
  if (!state) {
    throw new ApiError(httpStatus.NOT_FOUND, 'State not found');
  }
  Object.assign(state, updateBody);
  await state.save();
  return state;
};

const deleteStateById = async (stateId) => {
  const state = await getStateById(stateId);
  if (!state) {
    throw new ApiError(httpStatus.NOT_FOUND, 'state not found');
  }
  await state.remove();
  return state;
};

const createCountry = async (countryBody) => {
  
  return Country.create(countryBody);
};


const queryCountrys = async (filter, options) => {
  const countrys = await Country.paginate(filter, options);
  return countrys;
};

const getCountryById = async (id) => {
  return Country.findById(id);
};


const updateCountryById = async (countryId, updateBody) => {
  const country = await getCountryById(countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'country not found');
  }
 
  Object.assign(country, updateBody);
  await country.save();
  return country;
};

const deleteCountryById = async (countryId) => {
  const country = await getCountryById(countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'country not found');
  }
  await country.remove();
  return country;
};

module.exports = {
  createCity,
  queryCitys,
  getCityById,
  updateCityById,
  deleteCityById,

  createState,
  queryStates,
  getStateById,
  updateStateById,
  deleteStateById,

  createCountry,
  queryCountrys,
  getCountryById,
  updateCountryById,
  deleteCountryById,
};
