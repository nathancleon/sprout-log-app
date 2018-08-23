//TODO:
//=====:update the routes to use new auth user id

function getPlants() {
  $.get(`/plants/all/`, (plants) => {
    plants.data.forEach((plant, index) => {
      $('.js__plants__results').append(renderPlantItem(plant));
    });
    updateModal(plants)
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
    url:`/plants/new/`, 
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

function updateModal(plant) {
  $('.btn--edit').on('click', function() {
      let id = $(this).attr('data-id');
      console.log(id);

      let name = $(this).parent().siblings('.plant__item--name').text();
      let plantType = $(this).parent().siblings('.plant__item--type').text();
      let currentHealth = $(this).parent().siblings('.plant__item--health').text();
      
      $('input[name=name]').val(name);
      $('input[name=plantType]').val(plantType);
      $('#currentHealth').val(currentHealth);

      $('.btn--submit').hide();
      $('.btn--update').show();
  });
}

function renderPlantItem(plant) {
  let momentObj = moment(plant.created);
  let momentDate = momentObj.format('MMM Do YYYY');
  return `<tr class="js__plant__list">
          <th class="plant__item--name">${plant.name}</th>
          <th class="plant__item--type">${plant.plantType}</th>
          <th class="plant__item--health">${plant.currentHealth}</th>
          <th class="plant__item--date">${momentDate}</th>
          <th class="plant__item--id"><button class="btn--edit" type="button" data-id="${plant._id}">Edit</th>
          <th class="plant__item--date"><button class="btn--delete" type="button">Delete</button></th>
          </tr>`;
}