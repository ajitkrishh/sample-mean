const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');


const locationController = require('../../controllers/location.controller');
const locationValidation = require('../../validations/location.validation');
const router = express.Router();

router
  .route('/')
  .post(auth('manageLocations'), validate(locationValidation.createLocation), locationController.createLocation)
  .get(auth('getLocations'), validate(locationValidation.getLocations), locationController.getDetailedLocations);

router
  .route('/:locationId')
  .get(auth('getLocations'), validate(locationValidation.getLocation), locationController.getDetailedLocationById)
  .patch(auth('manageLocations'), validate(locationValidation.updateLocation), locationController.updateLocation)
  .delete(auth('manageLocations'), validate(locationValidation.deleteLocation), locationController.deleteLocation);

module.exports = router;

