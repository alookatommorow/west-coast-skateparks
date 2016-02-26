$(document).ready(function(){
  var appendSearchResultsToContainer = function (response) {
    $(".search-results-container").remove();
    $(".search-container").append(response);
    $('#search-modal').modal('show');
  };

  //////// Search form submit via enter key ////////
  $('.search-form').on('submit', function(event) {
    AJAX(event, 'get', appendSearchResultsToContainer);
  });

  //////// Search form submit via icon click ////////
  $('.circular.search').on('click', function(event) {
    event.preventDefault();
    var url = $(this).closest('form').attr('action');
    var data = $(this).closest('form').serialize();
    if ($('#search').val() === '') {
      return
    }
    $.ajax({url: url, data: data})
    .done(appendSearchResultsToContainer)
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
    makeItemClickable(this);
  });

});
