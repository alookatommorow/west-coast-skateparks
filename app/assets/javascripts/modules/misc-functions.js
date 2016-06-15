function displayFlashMessage() {
  $('#flashes').transition('fly left');
  setTimeout(function () {
    $('#flashes').transition('fly left');
  }, 2000);
}

function titleize(string) {
  var newby = formatSpecialCharacters(string);
  return newby.split(' ').map(function(word){
    if (word.charAt(0) === '(') {
      return word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2);
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }).join(' ');
}

function formatSpecialCharacters(string) {
  var slash = new RegExp('/');
  var dash = new RegExp('-');
  if (string.match(slash)) {
    var slashIndex = string.match(slash).index;
    return capitalizeAfterSpecialCharacters(string, slashIndex);
  } else if (string.match(dash))  {
    var dashIndex = string.match(dash).index;
    return capitalizeAfterSpecialCharacters(string, dashIndex);
  } else {
    return string;
  }
}

function capitalizeAfterSpecialCharacters(string, index) {
  return string.substr(0, index + 1) + string.charAt(index + 1).toUpperCase() + string.substr(index + 2)
}

var stateDisplay = {
  "california": "CA",
  "oregon": "OR",
  "washington": "WA"
}
