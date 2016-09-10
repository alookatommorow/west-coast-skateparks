function displayFlashMessage() {
  $('#flashes').transition('fly left');
  setTimeout(function () {
    $('#flashes').transition('fly left');
  }, 2000);
}

function titleize(string) {
  return string.replace(new RegExp("(?:\\b|_)([a-z])", "g"), function(char) {
      return char.toUpperCase();
  });
}

function capitalizeAfterSpecialCharacters(string, index) {
  return string.substr(0, index + 1) + string.charAt(index + 1).toUpperCase() + string.substr(index + 2)
}

var stateDisplay = {
  "california": "CA",
  "oregon": "OR",
  "washington": "WA"
}
