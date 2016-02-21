$(document).ready(function () {
  $('#flashes').transition('fly left');
  setTimeout(function () {
    $('#flashes').transition('fly left');
  }, 2000);
});