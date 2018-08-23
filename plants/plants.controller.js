const PlantModel = require('./plants.models');

//TODO:
//=====:update the middleware to use new auth user id

exports.fetchAllPlants = function(req, res) {
  PlantModel
    .find({
      userID: req.params.id
    })
    .then((plants) => {
      res.status(200).json({
        message: 'Retrieved all plants',
        data: plants
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something happened',
        data: error
      });
    });
};

exports.newPlant = function(req, res) {
  let newPlant = new PlantModel();

  newPlant.name = req.body.name;
  newPlant.plantType = req.body.plantType;
  newPlant.currentHealth = req.body.currentHealth;
  newPlant.userID = req.body.userID;

  newPlant
    .save()
    .then((plant) => {
      res.status(200).json({
        message: 'Plant saved correctly',
        data: plant
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something went wrong',
        data: error
      });
    });
};

//delete plant
exports.deletePlant = function(req, res) {
  PlantModel
    .findByIdAndRemove(req.params.id)
    .then((plant) => {
      res.status(200).json({
        message: 'plant successfully deleted',
        data: plant
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something did not work correctly',
        data: error
      });
    });
};

exports.updatePlant = function (req, res) {

  const updated = {};
  const updateableFields = ['name', 'plantType', 'currentHealth'];
  updateableFields.forEach(field => {
    if(field in req.body) {
      updated[field] = req.body[field];
    }
  });
  updated.lastUpdated = new Date();
  PlantModel
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPlant => res.json(updatedPlant))
    .catch(err => res.status(500).json({
      message: 'Something went terribly wrong'
    }));
};