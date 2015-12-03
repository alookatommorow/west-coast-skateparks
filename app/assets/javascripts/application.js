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
  bindEvents();
});

function bindEvents() {

  /////////////////////// Show modal on picture click /////////////

  $('.ui.image').click(function(){
    $('.modal-image').attr('src', this.src);
    $('.picture-modal').modal('show');
  });


  /////////////////////// Show skateparks by state/////////////

  $(".park-state").on('click', function(event){
    event.preventDefault();
    var url = $(this).attr('href');
    $(this).addClass('active').siblings().removeClass('active');
    $.ajax({url: url, dataType: 'JSON'}).done(function(response) {
      $(".parks-container").children().remove();
      $(".parks-container").append(response.partial)
    })
  });


/////////////////////// Search /////////////

  $('.search-form').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = {search: $(this).find("input[name='search']").val()}
    $.ajax({url: url, data: data, dataType: 'JSON'}).done(function(response) {
      $(".search-results-container").remove();
      $(".search-container").append(response.partial);
    })

  });


/////////Close Search //////

  $(".search-container").on('click', '.close-search', function(){
    $(this).parent().slideToggle(400, function(){});
    $('.search-form').find("input[name='search']").val('')
  });


/////////Select Skatepark From Search //////

$(".search-container").on('click', '.item', function(){
  window.location = $(this).find("a").attr("href");
  return false;
  });

  /////////Select Skatepark From List//////
$(".parks-container").on('click', '.item', function(){
  window.location = $(this).find("a").attr("href");
  return false;
  });

///////////Select Skatepark From Profile Page////////

$(".profile-container").on('click', '.item', function(){
  window.location = $(this).find("a").attr("href");
  return false;
  });


  ////////////////////////Toggle Create Form///////////////////

  $(".new-skatepark").on('click', function() {
  $(".create-container").slideToggle(900, function(){});
  })


  $(".rate-container").on('click', '.first-rate-button', function() {
    $(".rate-form-container").slideToggle(500, function(){});
  });


  /////////////////////// Toggle Initial Rate Form /////////

  $(".initial-rate-button").on('click', function(event) {
    event.preventDefault();
    $(".initial-rate-form-container").slideToggle(500, function(){});
  })

  ////////////////////////Toggle Rate Form///////////////////

  $(".button-container").on('click', '.rate-button', function(event) {
    event.preventDefault();
    $(".rate-form-container").slideToggle(500, function(){});
  })

   /////////////////////// Toggle Initial Review Form /////////
  $(".initial-review-button").on('click', function(event) {
    event.preventDefault();
    $(".initial-review-form-container").slideToggle(500, function(){});
  })

  ////////////////////////Toggle Review Form///////////////////

  $(".button-container").on('click', '.review-button', function(event) {
    event.preventDefault();
    $(".review-form-container").slideToggle(500, function(){});
  })










}





