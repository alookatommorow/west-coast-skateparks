function displayFlashMessage() {
  $('.flashes').addClass("fly-in-left visible");
  setTimeout(function () {
    $('.flashes').addClass("fly-out-left");
  }, 2000);
}

function titleize(string) {
  return string.replace(new RegExp("(?:\\b|_)([a-z])", "g"), function(char) {
      return char.toUpperCase();
  });
}

var stateDisplay = {
  "california": "CA",
  "oregon": "OR",
  "washington": "WA"
};


