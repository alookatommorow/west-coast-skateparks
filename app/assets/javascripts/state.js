$(document).ready(function(){

  //////// Show skateparks by state ////////
  $(".park-state").on('click', function(event){
    event.preventDefault();
    var url = $(this).attr('href');
    $(this).addClass('active').siblings().removeClass('active');
    $.ajax({url: url})
    .done(function(response) {
      $(".parks-container").children().remove();
      $(".parks-container").append(response)
    })
    .fail(function(response){
      console.error(response)
    })
  });

  //////// Select Skatepark From State List ////////
  $(".parks-container").on('click', '.item', function(){
    window.location = $(this).find("a").attr("href");
    return false;
  });

});