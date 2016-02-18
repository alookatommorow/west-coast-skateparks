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
//= require underscore
//= require gmaps/google
//= require semantic_ui/semantic_ui
//= require_tree .


$(document).ready(function() {
  //////// Show sign-in modal on picture click ////////
  $('.sign-in-button').click(function(){
    $('#sign-in-modal').modal('show');
  });

  //////// Show modal on picture click ////////
  $('.ui.image').click(function(){
    $('.modal-image').attr('src', this.src);
    $('.picture-modal').modal('show');
  });

  //////// Select Skatepark From Profile Page ////////
  $(".profile-container").on('click', '.item', function(){
    makeItemClickable(this);
  });

  //////// Toggle Rate Form ////////
  $(".rate-button").on('click', function(event) {
    event.preventDefault();
    $(".rate-form-container").slideToggle(500, function(){});
  });

  //////// Toggle Review Form ////////
  $(".review-button").on('click', function(event) {
    event.preventDefault();
    $(".review-form-container").slideToggle(500, function(){});
  });

  //////// activate dropdown on rate form ////////
  $('.ui.dropdown').dropdown();

});





