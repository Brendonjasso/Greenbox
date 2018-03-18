$(document).ready(function () {
  $("#strain-submit").click(function (event) {
    event.preventDefault();
    $("#mood-panel").show();
    $("#strain-panel").slideUp("slow", function () {
      $("#strain-panel").hide();
    });
  });

  $("#submit").click(function(event){
    event.preventDefault();
    var activeButtons = {};

    $formData = $("button").each(function(){
      var key = $(this).attr('name');
      var value = $(this).attr('aria-pressed');
      activeButtons[key] = value;
    });
    console.log(activeButtons);
     $.ajax({
       url: '/update-settings/',
       dataType: 'json',
       type: 'POST',
       data: activeButtons,
       success: function(data){
         console.log(data);
       },
       error: function(data){
         console.log(data);
       }
     });
  });
});
