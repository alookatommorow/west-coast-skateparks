// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require_tree .


$(document).ready(function() {

  bindEvents();


});



function bindEvents() {


  /////////////////////// Show skateparks by state/////////////

  $(".park-state").on('click', function(event){
    event.preventDefault();
    console.log("getting")
    var url = $(this).attr('href');
    console.log(url)
    $("#test").remove();
    $.ajax({url: url, dataType: 'JSON'}).done(function(response) {
      console.log(response.partial)
      $(".parks-container").children().remove();
      $(".parks-container").append(response.partial)
    })
  });

  /////////////////////////Delete Skatepark///////////////////

  $(".parks-container").on('click', ".park-delete", function(event) {
    event.preventDefault();
    var url = $(this).attr('ajax_path');
    console.log("getting " + url)
    $.ajax({url: url, type: 'delete', dataType: 'JSON'}).done(function(response) {
      var park_id = "." + response.id;
      console.log("park delted")
      $(park_id).remove();
    })
  });

}
