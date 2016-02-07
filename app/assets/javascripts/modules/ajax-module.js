var AJAX = (function(){
  var requests = {
    form: function(event, method) {
      return $.ajax({
        url: $(event.target).attr('action'),
        data: $(event.target).serialize(),
        method: method
      });
    },

    link: function(event) {
      return $.ajax({
        url: $(event.target).attr('href')
      });
    }
  };

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
      }
    },
    favorite: {
      post: function() {
        $('.remove-favorite-button').removeClass('hidden');
        $('.add-favorite-button').addClass('hidden');
      },
      put: function() {
        $('.remove-favorite-button').addClass('hidden');
        $('.add-favorite-button').removeClass('hidden');
      }
    },
    search: function(response) {
      $(".search-results-container").remove();
      $(".search-container").append(response);
    },
    state: function(response, event) {
      $(event.target).addClass('active').siblings().removeClass('active');
      $(".parks-container").children().remove();
      $(".parks-container").append(response);
    }
  };

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
      ajaxRequest(event, 'get', callbacks['search']);
    },
    state: function(event) {
      ajaxRequest(event, 'get', callbacks['state']);
    }
  };

  function ajaxRequest(event, method, callback) {
    event.preventDefault();
    var request;
    var comingFromAform = $(event.target).attr('action');

    if (comingFromAform) {
      request = requests.form(event, method);
    } else {
      request = requests.link(event);
    }

    request.done(function(response) {
      callback(response, event);
    });
    request.fail(function(response){
      console.log(response, event);
    });
  }

  return exports;

}());





