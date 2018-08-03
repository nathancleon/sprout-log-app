console.log('I am working');

$.get('/plants/all', (plants) => {
  plants.data.forEach((plant, index) => {
    $('.js-plant-list').append(renderPlantItem(plant));
  });
});

function renderPlantItem(plant) {
  return `<div class="plant-item">${plant.name}</div>`;
}