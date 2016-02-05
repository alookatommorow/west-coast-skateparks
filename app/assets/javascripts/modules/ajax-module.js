 var AJAX = (function(){
  var callbacks = {
    visit: {
      post: function() {
        $('.remove-visit-button').removeClass('hidden');
        $('.add-visit-button').addClass('hidden');
        $('.opinions-container').removeClass('hidden');
      },
      put: function() {
        $('.remove-visit-button').addClass('hidden');
        $('.add-visit-button').removeClass('hidden');
        $('.opinions-container').addClass('hidden');
      },
    },
    favorite: {
      post: function() {
        $('.remove-favorite-button').removeClass('hidden');
        $('.add-favorite-button').addClass('hidden');
      },
      put: function() {
        $('.remove-favorite-button').addClass('hidden');
        $('.add-favorite-button').removeClass('hidden');
      },
    },
    search: function(response) {
      $(".search-results-container").remove();
      $(".search-container").append(response);
    }
  }

  function ajaxRequest(event, method, callback) {
    event.preventDefault();
    $.ajax({
      url: $(event.target).attr('action'),
      data: $(event.target).serialize(),
      method: method,
    })
    .done(function(response) {
      callback(response);
    })
    .fail(function(response){
      console.log(response);
    });
  }

  var exports = {
    visit: {
      post: function(event) {
        ajaxRequest(event, 'post', callbacks['visit']['post']);
      },
      put: function(event) {
        ajaxRequest(event, 'put', callbacks['visit']['put']);
      }
    },
    favorite: {
      post: function(event) {
        ajaxRequest(event, 'post', callbacks['favorite']['post']);
      },
      put: function(event) {
        ajaxRequest(event, 'put', callbacks['favorite']['put']);
      }
    },
    search: function(event) {
      ajaxRequest(event, 'get', callbacks['search'])
    }
  }

  return exports;

})();





