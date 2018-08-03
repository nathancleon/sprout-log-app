const express = require('express');
const plantsController = require('./plants.controller');

let router = express.Router();

router.get('/sayHello', plantsController.sayHello);

router.get('/plants/', plantsController.fetchAllPlants);

router.post('/new', plantsController.newPlant);

router.put('/plant/:id', plantsController.updatePlant);

router.delete('/plant/:id', plantsController.deletePlant);

module.exports = router;