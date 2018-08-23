const express = require('express');
const plantsController = require('./plants.controller');

let router = express.Router();

//TODO:
//=====:update the routes to use new auth user id

router.get('/all', plantsController.fetchAllPlants);

router.get('/all/', plantsController.fetchAllPlants);

router.post('/new/', plantsController.newPlant);

router.put('/one/:id', plantsController.updatePlant);

router.delete('/one/:id', plantsController.deletePlant);

module.exports = router;