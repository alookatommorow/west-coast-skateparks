function makeItemClickable(target) {
  window.location = $(target).find("a").attr("href");
  return false;
}