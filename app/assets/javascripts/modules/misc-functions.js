function makeItemClickable(target) {
  window.location = $(target).find("a").attr("href");
  return false;
}

// get rid of this
function toggleVisibility(legend) {
  legend.hide.addClass('hidden');
  legend.show.removeClass('hidden');
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
