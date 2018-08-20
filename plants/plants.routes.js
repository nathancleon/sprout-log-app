const express = require('express');
const plantsController = require('./plants.controller');
const middleware = require('../middleware');

let router = express.Router();

router.get('/all/:token', middleware.verifyToken,  plantsController.fetchAllPlants);

router.post('/new/:token', middleware.verifyToken,  plantsController.newPlant);

router.put('/one/:id', plantsController.updatePlant);

router.delete('/one/:id', plantsController.deletePlant);

module.exports = router;