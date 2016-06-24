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
  var slashIndex = string.indexOf("/");
  var dashIndex = string.indexOf("-");
  if (slashIndex !== -1) {
    return capitalizeAfterSpecialCharacters(string, slashIndex);
  } else if (dashIndex !== -1)  {
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
