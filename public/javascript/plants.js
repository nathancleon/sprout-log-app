//TODO:
//=====:update the routes to use new auth user id

function getPlants() {
  $.get(`/plants/all/` + $('.userID').val(), (plants) => {
    plants.data.forEach((plant, index) => {
      $('.js__plants__results').append(renderPlantItem(plant));
    });
    updateModal(plants);
    deletePlantItem(plants);
  });
}

getPlants();

$('.btn--submit').on('click', function(event) {
  event.preventDefault();
  let plantName = $("#name").val();
  let plantType = $("#plantType").val();
  let currentHealth = $("#currentHealth").val();
  let userID = $('.userID').val();
  let newPlantObject = {
    name: plantName,
    plantType: plantType,
    currentHealth: currentHealth,
    userID: userID
  };
  $.ajax({ 
    type: "POST", 
    contentType: 'application/json',
    url:`/plants/new/`, 
    data: JSON.stringify(newPlantObject),
    success: function(response) {
      $('.js__plants__results').append(renderPlantItem(response.data));
      console.log(response);
    },
    fail: function(data) {
      console.log(data);
    }
  });
});

function updateModal(plant) {
  $('.js__plants__results').on('click', '.btn--edit', function() {
      let id = $(this).attr('data-id');

      let name = $(this).parent().siblings('.plant__item--name').text();
      let plantType = $(this).parent().siblings('.plant__item--type').text();
      let currentHealth = $(this).parent().siblings('.plant__item--health').text();

      $('input[name=name]').val(name);
      $('input[name=plantType]').val(plantType);
      $('#currentHealth').val(currentHealth);

      $('.btn--submit').hide();
      $('.btn--update').show();

      $('.btn--update').on('click', function() {
        let updatedPlantName = $("#name").val();
        let updatedPlantType = $("#plantType").val();
        let updatedCurrentHealth = $("#currentHealth").val();
        let userID = $('.userID').val();
        let updatedPlantObject = {
          name: updatedPlantName,
          plantType: updatedPlantType,
          currentHealth: updatedCurrentHealth,
          _id: id,
          userID: userID
        };
        $.ajax({ 
          type: "PUT", 
          contentType: 'application/json',
          url:`/plants/one/${id}`, 
          data: JSON.stringify(updatedPlantObject),
          success: function(data) {
            let name = $(`tr[data-id="${data._id}"]`).find('.plant__item--name');
            let plantType = $(`tr[data-id="${data._id}"]`).find('.plant__item--type');
            let currentHealth = $(`tr[data-id="${data._id}"]`).find('.plant__item--health');

            name.text(updatedPlantObject.name);
            plantType.text(updatedPlantObject.plantType);
            currentHealth.text(updatedPlantObject.currentHealth);
          },
          fail: function(id) {
            console.log(id);
          }
        });

        $('#name').val('');
        $('#plantType').val('');
        $("#currentHealth").val('');

        $('.btn--update').hide();
        $('.btn--submit').show();
      });
  });
}

function deletePlantItem(plant) {
  $('.js__plants__results').on('click', '.btn--delete',  function() {
    console.log(plant);
    let id = $(this).attr('data-id');
    let row = $(this).parent().parent();
    console.log(id);

    $.ajax({
      url: `/plants/one/${id}`,
      type: 'DELETE',
      data: id,
      success: function(id) {
        console.log(`plant deleted`);
        row.remove();
      },
      fail: function(id) {
        console.log(id);
      }
    });
  });
}

function renderPlantItem(plant) {
  let momentObj = moment(plant.created);
  let momentDate = momentObj.format('MMM Do YYYY');
  return `<tr class="js__plant__list" data-id="${plant._id}">
          <td class="plant__item--name">${plant.name}</td>
          <td class="plant__item--type">${plant.plantType}</td>
          <td class="plant__item--health">${plant.currentHealth}</td>
          <td class="plant__item--date">${momentDate}</td>
          <td class="plant__item--id"><button class="btn--edit" type="button" data-id="${plant._id}">Edit</td>
          <td class="plant__item--date"><button class="btn--delete" type="button" data-id="${plant._id}">Delete</button></thd>
          </tr>`;
}