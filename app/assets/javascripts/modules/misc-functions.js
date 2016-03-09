function makeItemClickable(target) {
  window.location = $(target).find("a").attr("href");
  return false;
}

function displayFlashMessage() {
  $('#flashes').transition('fly left');
  setTimeout(function () {
    $('#flashes').transition('fly left');
  }, 2000);
}
