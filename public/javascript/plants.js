console.log('I am working');
function getPlants() {
  $.get('/plants/all', (plants) => {
    plants.data.forEach((plant, index) => {
      $('.js__plants__results').append(renderPlantItem(plant));
    });
  });
}

getPlants();

$('.btn--submit').click(function(event) {
  event.preventDefault();
  let plantName = $("#name").val();
  let plantType = $("#plantType").val();
  let currentHealth = $("#currentHealth").val();
  let created = new Date();
  let newPlantObject = {
    name: plantName,
    plantType: plantType,
    currentHealth: currentHealth,
    created: created
  };
  $.ajax({ 
    type: "POST", 
    contentType: 'application/json',
    url:'./plants/new', 
    data: JSON.stringify(newPlantObject),
    success: function(data) {
      $('.js__plants__results').append(renderPlantItem(newPlantObject));
      console.log(data);
    },
    fail: function(data) {
      console.log(data);
    }
  });
});

function renderPlantItem(plant) {
  return `<tr class="js__plant__list">
          <th class="plant__item--name">${plant.name}</th>
          <th class="plant__item--type">${plant.plantType}</th>
          <th class="plant__item--health">${plant.currentHealth}</th>
          <th class="plant__item--date">${plant.created}</th>
          </tr>`;
}