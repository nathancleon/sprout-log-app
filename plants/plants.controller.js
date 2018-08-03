const PlantModel = require('./plants.models');

exports.sayHello = function(req, res) {
  res.status(200).json({
    message: 'this is the sayHello route'
  });
}

exports.fetchAllPlants = function(req, res) {
  PlantModel
    .find()
    ,then((plants) => {
      res.status(200).json({
        message: 'Retrieved all plants',
        data: plants
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something happened',
        data: error
      })
    })
}

exports.newPlant = function(req, res) {
  let newPlant = new PlantModel();

  newPlant.name = req.body.name;

  newPlant
    .save()
    .then((plant) => {
      res.status(200).json({
        message: 'Plant saved correctly',
        data: plant
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something went wrong',
        data: error
      })
    })
}

//delete plant
exports.deletePlant = function(req, res) {
  PlantModel
    .findByIdAndRemove(req.params.id)
    .then((plant) => {
      res.status(200).json({
        message: 'plant successfully deleted',
        data: plant
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something did not work correctly',
        data: error
      })
    })
}

exports.updatePlant = function (req, res) {
  if (!(req.params.id && req.body.id && req.params.id  === req.body.id)) {
    req.status(400).json({
      error: 'Request path id and req body id values must match'
    })
  }

  const updated = {};
  const updateableFields = ['name', 'currentHealth', 'created'];
  updateableFields.forEach(field => {
    if(field in req.body) {
      updated[field] = req.body[field];
    }
  });

  PlantModel
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPlant => res.status(204).end())
    .catch(err => res.status(500).json({
      message: 'Something went terribly wrong'
    }));
}