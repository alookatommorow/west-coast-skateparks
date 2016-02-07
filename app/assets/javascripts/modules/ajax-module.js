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

  var ajaxRequest = function (event, method, callback) {
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

  return ajaxRequest;

}());





