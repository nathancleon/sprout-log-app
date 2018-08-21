function getPlants() {
  $.get(`/plants/all/${localStorage.getItem('token')}`, (plants) => {
    plants.data.forEach((plant, index) => {
      $('.js__plants__results').append(renderPlantItem(plant));
      for (i = 0; i < index.length; i++) {
        console.log(plant._id);
        updatePlant(plant);
      }
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
    url:`/plants/new/${localStorage.getItem('token')}`, 
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

function updatePlant(plant) {
  $('#plant__item--id__input').on('change', function() {
    if(this.checked) {
      let value = $('#plant__item--id__input').val();
      console.log(value);

      $('.btn--submit').hide();
      $('.btn--update').show();
    } else {
      $('.btn--update').hide();
      $('.btn--submit').show();
    }
  });
}

function renderPlantItem(plant) {
  let momentObj = moment(plant.created);
  let momentDate = momentObj.format('MMM Do YYYY');
  updatePlant(plant);
  return `<tr class="js__plant__list">
          <th class="plant__item--id"><input type="checkbox" id="plant__item--id__input" name="plantID" value="${plant._id}"></th>
          <th class="plant__item--name">${plant.name}</th>
          <th class="plant__item--type">${plant.plantType}</th>
          <th class="plant__item--health">${plant.currentHealth}</th>
          <th class="plant__item--date">${momentDate}</th>
          <th class="plant__item--date"><button class="btn--delete" type="button">Delete</button></th>
          </tr>`;
}