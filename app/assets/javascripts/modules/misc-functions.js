function displayFlashMessage() {
  $('#flashes').transition('fly left');
  setTimeout(function () {
    $('#flashes').transition('fly left');
  }, 2000);
}

function titleize(string) {
  return string.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

var stateDisplay = {
  "california": "CA",
  "oregon": "OR",
  "washington": "WA"
}
