function makeItemClickable(target) {
  window.location = $(target).find("a").attr("href");
  return false;
}

function hideThisShowOpposite(target) {
  target.hide();
  $(target.data('show')).show();
}

function ajaxButtonToggle(event) {
  AJAX(event, function() {
    hideThisShowOpposite($(event.target));
  });
}
