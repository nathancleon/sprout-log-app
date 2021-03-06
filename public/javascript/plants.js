//load plants associated with userID
function getPlants() {
  $.get(`/plants/all/` + $('.userID').val(), (plants) => {
    plants.data.forEach((plant) => {
      $('.js__plants__results').append(renderPlantItem(plant));
    });
  });
}

//create a new plant after form submit
function newPlant() {
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
    $('.plant__form__container').removeClass('js__modal--active');
      $('.overlay').css('display', 'none');
    $.ajax({ 
      type: "POST", 
      contentType: 'application/json',
      url:`/plants/new/`, 
      data: JSON.stringify(newPlantObject),
      success: function(response) {
        $('.js__plants__results').append(renderPlantItem(response.data));
      },
      fail: function(data) {
        console.log(data);
      }
    });
  });
}

function modalNewPlant() {
  $('.btn--new__plant').on('click', function(event) {
    event.preventDefault();
    $('#name').val('');
    $('#plantType').val('');
    $("#currentHealth").val('');

    $('.btn--update').hide();
    $('.btn--submit').show();
    $('.plant__form__container').addClass('js__modal--active');
    $('.overlay').css('display', 'block');
  });
}

function closeModal() {
  $('.overlay').on('click', function() {
    if($('.js__modal--active').length > 0) {
      $('.plant__form__container').removeClass('js__modal--active');
      $('.overlay').css('display', 'none');
    }
  });
  $('.btn--form__exit').on('click', function(event) {
    event.preventDefault();
    $('.plant__form__container').removeClass('js__modal--active');
    $('.overlay').css('display', 'none');
  });
}

//update text in form when edit button is clicked
//takes values of selected plant and puts it in form inputs
function updateForm() {
  $('body').on('click', '.btn--edit', function() {
      $('.plant__form__container').addClass('js__modal--active');
      $('.overlay').css('display', 'block');
      let id = $(this).attr('data-id');
      let name = $(this).parent().siblings('.plant__item--name').text();
      let plantType = $(this).parent().siblings('.plant__item--type').text();
      let currentHealth = $(this).parent().siblings('.plant__item--health').text();

      $('input[name=name]').val(name);
      $('input[name=plantType]').val(plantType);
      $('#currentHealth').val(currentHealth);

      $('.btn--submit').hide();
      $('.btn--update').show();
      $('.btn--update').attr('data-id', id);
  });
}

//update plant w new info when update btn is clicked
function updatePlant() {
  $('body').on('click', '.btn--update', function() {
    let updatedPlantName = $("#name").val();
    let updatedPlantType = $("#plantType").val();
    let updatedCurrentHealth = $("#currentHealth").val();
    let id = $('.btn--update').attr('data-id');
    let updatedPlantObject = {
      name: updatedPlantName,
      plantType: updatedPlantType,
      currentHealth: updatedCurrentHealth,
    };
    $.ajax({ 
      type: "PUT", 
      contentType: 'application/json',
      url:`/plants/one/${id}`, 
      data: JSON.stringify(updatedPlantObject),
      success: function(response) {
        let name = $(`tr[data-id="${response._id}"]`).find('.plant__item--name');
        let plantType = $(`tr[data-id="${response._id}"]`).find('.plant__item--type');
        let currentHealth = $(`tr[data-id="${response._id}"]`).find('.plant__item--health');
        let updatedDate = $(`tr[data-id="${response._id}"]`).find('.plant__item--date');
        let updatedMomentObj = moment(response.lastUpdated);
        let momentUpdatedDate = updatedMomentObj.fromNow();
        
        name.text(response.name);
        plantType.text(response.plantType);
        currentHealth.text(response.currentHealth);
        updatedDate.text(momentUpdatedDate);
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
}


function deletePlantItem() {
  $('.js__plants__results').on('click', '.btn--delete',  function() {
    let id = $(this).attr('data-id');
    let row = $(this).parent().parent();

    $.ajax({
      url: `/plants/one/${id}`,
      type: 'DELETE',
      data: id,
      success: function() {
        console.log(`plant deleted`);
        row.remove();
      },
      fail: function(id) {
        console.log(id);
      }
    });
  });
}

//render plants on the page in the table when function is called
function renderPlantItem(plant) {
  let momentObj = moment(plant.lastUpdated);
  let momentDate = momentObj.fromNow();
  return `<tr class="js__plant__list" data-id="${plant._id}" aria-live="assertive">
          <td class="plant__item--name">${plant.name}</td>
          <td class="plant__item--type">${plant.plantType}</td>
          <td class="plant__item--health">${plant.currentHealth}</td>
          <td class="plant__item--date">${momentDate}</td>
          <td class="plant__item--edit">
            <span class="btn--edit" type="button" data-id="${plant._id}">
              <svg class="btn--edit--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" fill="#E68A00"/>
              </svg>
            </span>
          </td>
          <td class="plant__item--delete">
            <span class="btn--delete" type="button" data-id="${plant._id}">
              <svg class="btn--delete--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M325.8 193.8L263.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L224 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" fill="#CC0000"/>
              </svg>
            </span>
          </td>
          </tr>`;
}

getPlants();
newPlant();
updateForm();
updatePlant();
deletePlantItem();
modalNewPlant();
closeModal();