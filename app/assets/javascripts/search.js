$(document).ready(function(){
  var appendSearchResultsToContainer = function (response) {
    $(".ui.dimmer").removeClass("active");
    $(".search-container").empty().append(response);
  };

  //////// Search form submit via enter key ////////
  $('.search-form').on('submit', function(event) {
    $(".ui.dimmer").addClass("active");
    $.get(this.action, $(this).serialize(), appendSearchResultsToContainer);

    event.preventDefault();
  });

  //////// Search form submit via icon click ////////
  $('#search-button').on('click', function(event) {
    $('.search-form').submit();
  });
});
