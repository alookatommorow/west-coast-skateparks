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

  //////// Show modal on picture click ////////
  $('.ui.image').click(function(){
    $('.modal-image').attr('src', this.src);
    $('.picture-modal').modal('show');
  });

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

  //////// Search form submit via enter key ////////
  $('.search-form').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({url: url, data: data})
    .done(function(response) {
      $(".search-results-container").remove();
      $(".search-container").append(response);
    })
    .fail(function(response){
      console.error(response);
    })
  });

  //////// Search form submit via icon click ////////
  $('.circular.search').on('click', function(event){
    var url = $(this).closest('form').attr('action');
    var data = $(this).closest('form').serialize();
    $.ajax({url: url, data: data})
    .done(function(response) {
      $(".search-results-container").remove();
      $(".search-container").append(response);
    })
    .fail(function(response){
      console.error(response);
    })
  });

  //////// Close Search ////////
  $(".search-container").on('click', '.close-search', function(){
    $(this).parent().slideToggle(400, function(){});
    $('.search-form').find("input[name='search']").val('');
  });

  //////// Select Skatepark From Search ////////
  $(".search-container").on('click', '.item', function(){
    window.location = $(this).find("a").attr("href");
    return false;
  });

  //////// Select Skatepark From List ////////
  $(".parks-container").on('click', '.item', function(){
    window.location = $(this).find("a").attr("href");
    return false;
  });

  //////// Select Skatepark From Profile Page ////////
  $(".profile-container").on('click', '.item', function(){
    window.location = $(this).find("a").attr("href");
    return false;
  });

  //////// Toggle Create Form ////////
  $(".new-skatepark").on('click', function() {
    $(".create-container").slideToggle(900, function(){});
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


}





