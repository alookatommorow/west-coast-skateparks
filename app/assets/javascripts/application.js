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
//= require jquery_ujs
//= require_tree .


$(document).ready(function() {

  bindEvents();


});



function bindEvents() {


  /////////////////////// Show skateparks by state/////////////

  $(".park-state").on('click', function(event){
    event.preventDefault();
    var url = $(this).attr('href');
    $.ajax({url: url, dataType: 'JSON'}).done(function(response) {
      $(".parks-container").children().remove();
      $(".parks-container").append(response.partial)
    })
  });


  ////////////////////////Toggle Create Form///////////////////

  $(".new-skatepark").on('click', function() {
  console.log("clicked");
  $(".create-container").slideToggle(900, function(){});
  })


  ////////////////////////Toggle Rate Form///////////////////

  $(".rate-button-container").on('click', function(event) {
  console.log("clicked");
  event.preventDefault();
  $(".rate-container").slideToggle(900, function(){});
  })






}





