function displayFlashMessage() {
  $('#flashes').transition('fly left');
  setTimeout(function () {
    $('#flashes').transition('fly left');
  }, 2000);
}

function titleize(string) {
  var newby = capitalizeAfterSlash(string);
  return newby.split(' ').map(function(word){
    if (word.charAt(0) === '(') {
      return word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2);
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }).join(' ');
}

function capitalizeAfterSlash(string) {
  var indexOfSlash = string.indexOf('/');
  if (indexOfSlash !== -1) {
    return string.substr(0, indexOfSlash + 1) + string.charAt(indexOfSlash + 1).toUpperCase() + string.substr(indexOfSlash + 2)
  } else {
    return string;
  }
}

var stateDisplay = {
  "california": "CA",
  "oregon": "OR",
  "washington": "WA"
}
