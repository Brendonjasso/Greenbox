$(".submit").click(function(event){
  event.preventDefault();
  $formData = $("#login-account").serialize();
  console.log($formData);
  $.ajax({
    url: '/login/',
    dataType: 'json',
    type: 'POST',
    data: $formData,
    success: function(data){
      statusCode = data['StatusCode'];
      console.log(statusCode);
      if(statusCode != "0"){
        $("#error-notify").modal('show');
      }else {
        token = data['Token'];
        console.log(token);
        document.cookie = "token=" + token;
      }

    },
    error: function(data){
      console.log(data);
    }
  });
});