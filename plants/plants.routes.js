const express = require('express');
const plantsController = require('./plants.controller');

let router = express.Router();

router.get('/all/', plantsController.fetchAllPlants);

router.post('/new', plantsController.newPlant);

router.put('/one/:id', plantsController.updatePlant);

router.delete('/one/:id', plantsController.deletePlant);

module.exports = router;