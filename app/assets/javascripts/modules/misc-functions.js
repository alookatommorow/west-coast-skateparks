function makeItemClickable(target) {
  window.location = $(target).find("a").attr("href");
  return false;
}

function hideMeShowOpposite(target) {
  target.hide();
  $(target.data('toggle')).show();
}
