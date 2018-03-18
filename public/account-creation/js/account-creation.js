$(".submit").click(function(event){
  event.preventDefault();
  $formData = $("#create-account").serialize();
  //console.log($formData);
  $.ajax({
    url: '/create/',
    dataType: 'json',
    type: 'POST',
    data: $formData,
    success: function(data){
      console.log(data);
    },
    error: function(data){
      console.log(data);
    }
  });
});