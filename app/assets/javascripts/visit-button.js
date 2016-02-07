$(document).ready(function() {
  var showRemoveVisitBtnShowOpinionsContainer = function () {
    $('.remove-visit-button').removeClass('hidden');
    $('.add-visit-button').addClass('hidden');
    $('.opinions-container').removeClass('hidden');
  };
  var showAddVisitBtnHideOpinionsContainer = function () {
    $('.remove-visit-button').addClass('hidden');
    $('.add-visit-button').removeClass('hidden');
    $('.opinions-container').addClass('hidden');
  };


  $('.add-visit-button').on('submit', function(event){
    AJAX(event, 'post', showRemoveVisitBtnShowOpinionsContainer);
  });

  $('.remove-visit-button').on('submit', function(event){
    AJAX(event, 'put', showAddVisitBtnHideOpinionsContainer);
  });
});

