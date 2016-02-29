var AJAX = (function(){
  var requests = {
    form: function(event) {
      return $.ajax({
        url: $(event.target).attr('action'),
        data: $(event.target).serialize(),
        method: $(event.target).attr('method'),
      });
    },

    link: function(event) {
      return $.ajax({
        url: $(event.target).attr('href')
      });
    }
  };

  return function (event, callback) {
    var request;
    var comingFromAform = $(event.target).attr('action');

    if (comingFromAform) {
      request = requests.form(event);
    } else {
      request = requests.link(event);
    }

    request.done(function(response) {
      callback(response, event);
    });
    request.fail(function(response){
      console.log(response, event);
    });

    event.preventDefault();
  };
}());





