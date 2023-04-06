const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');


const cityController = require('../../controllers/city.controller');
const stateController = require('../../controllers/state.controller');
const countryController = require('../../controllers/country.controller');
const cityValidation = require('../../validations/city.validation');
const stateValidation = require('../../validations/state.validation');
const countryValidation = require('../../validations/location.validation');

const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

router1
  .route('/')
  .post(auth('getLocations'), validate(cityValidation.createCity), cityController.createCity)
  .get(auth('getLocations'), validate(cityValidation.getCitys), cityController.getCitys);

router1
  .route('/:cityId')
  .get(auth('getLocations'), validate(cityValidation.getCity), cityController.getCity)
  .patch(auth('manageLocations'), validate(cityValidation.updateCity), cityController.updateCity)
  .delete(auth('manageLocations'), validate(cityValidation.deleteCity), cityController.deleteCity);
  // -----------------------------------------------
  router2
  .route('/')
  .post(auth('manageLocations'), validate(stateValidation.createState), stateController.createState)
  .get(auth('getLocations'), validate(stateValidation.getStates), stateController.getStates);
  
  router2
  .route('/:stateId')
  .get(auth('getLocations'), validate(stateValidation.getState), stateController.getState)
  .patch(auth('manageLocations'), validate(stateValidation.updateState), stateController.updateState)
  .delete(auth('manageLocations'), validate(stateValidation.deleteState), stateController.deleteState);
  // -----------------------------------------------
router3
  .route('/')
  .post(auth('manageLocations'), validate(countryValidation.createCountry), countryController.createCountry)
  .get(auth('getLocations'), validate(countryValidation.getCountrys), countryController.getCountrys);

router3
  .route('/:countryId')
  .get(auth('getLocations'), validate(countryValidation.getCountry), countryController.getCountry)
  .patch(auth('manageLocations'), validate(countryValidation.updateCountry), countryController.updateCountry)
  .delete(auth('manageLocations'), validate(countryValidation.deleteCountry), countryController.deleteCountry);

module.exports = {
  router1,
  router2,
  router3,
} ;
