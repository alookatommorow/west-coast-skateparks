function makeItemClickable(target) {
  window.location = $(target).find("a").attr("href");
  return false;
}

function toggleVisibility(legend) {
  legend.hide.addClass('hidden');
  legend.show.removeClass('hidden');
}
