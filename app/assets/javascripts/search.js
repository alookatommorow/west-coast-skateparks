$(document).ready(function(){
  var appendSearchResultsToContainer = function (response) {
    $(".ui.dimmer").removeClass("active");
    $(".search-container").empty().append(response);
  };

  //////// Search form submit via enter key ////////
  $('.search-form').on('submit', function(event) {
    $(".ui.dimmer").addClass("active");
    AJAX(event, appendSearchResultsToContainer);
  });

  //////// Search form submit via icon click ////////
  $('.circular.search').on('click', function(event) {
    $('.search-form').submit();
  });
});
