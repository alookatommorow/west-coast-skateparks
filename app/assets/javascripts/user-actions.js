$(document).ready(function() {
  $('.add-favorite-button').on('submit', ajaxButtonToggle);
  $('.remove-favorite-button').on('submit', ajaxButtonToggle);

  $('.add-visit-button').on('submit', ajaxButtonToggle);
  $('.remove-visit-button').on('submit', ajaxButtonToggle);
});
