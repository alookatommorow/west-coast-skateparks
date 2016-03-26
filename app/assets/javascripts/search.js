$(document).ready(function(){
  var appendSearchResultsToContainer = function (response) {
    $(".search-container").empty().append(response);
  };

  //// Open search modal ////
  $('.search-nav').click(function(event){
    event.preventDefault();
    $('#search-modal').modal('show');
  });

  //////// Search form submit via enter key ////////
  $('.search-form').on('submit', function(event) {
    AJAX(event, appendSearchResultsToContainer);
  });

  //////// Search form submit via icon click ////////
  $('.circular.search').on('click', function(event) {
    $('.search-form').submit();
  });
});
