$('.form__register').submit((event) => {
  event.preventDefault();
  let username = $("#user").val();
  let password = $("#pass").val();
  let newUser = {
    email: username,
    password: password
  };
  $.ajax({ 
    type: "POST", 
    contentType: 'application/json',
    url:'/auth/register/', 
    data: JSON.stringify(newUser),
    success: function(data) {
      console.log(data);
      window.location.pathname = 'dashboard.html';
    },
    fail: function(data) {
      console.log(data);
    }
  });
})