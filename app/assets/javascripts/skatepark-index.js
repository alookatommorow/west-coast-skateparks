$(document).ready(function(){
  var pageCount = 1;
  var currentStateLink;

  //////// Show skateparks by state ////////
  $("a[data-state-link]").on("click", function(event){
    event.preventDefault();
    if ($(this).hasClass("active")) {
      return;
    }

    pageCount = 1;
    currentStateLink = this.href;

    $(".active").removeClass("active");
    $(this).addClass("active");
    $.get(this.href, renderSkateparks);
  });

  //////// Show skateparks by state mobile ////////
  $("a[data-mobile-state-link]").on("click", function(event){
    event.preventDefault();
    $(".index-menu-container").slideUp(function(){
      $.get(this.href, renderSkateparks);
    }.bind(this));

    pageCount = 1;
    currentStateLink = this.href;
  });

  /////// Show skatepark by Letter ////////
  $(".parks-container").on("click", "a[data-skatepark-letter-link]", function(event) {
    event.preventDefault();

    pageCount = 1;
    currentStateLink = this.href;

    $.get(this.href, renderSkateparks);
  });

  $(".parks-container").on("click", ".show-mobile-menu", function(){
    $(".parks-container").children().remove();
    $(".index-menu-container").slideDown();
  });

  ////// infinity scroll //////
  $(window).scroll(infiniteScroll);

  function infiniteScroll() {
    var scrolledToBottom = ($(document).height() - $(window).height()) - 400 <= $(window).scrollTop();
    if (scrolledToBottom && currentStateLink && morePagesLeft()) {
      updatePageNumber();
      $(window).off("scroll");
      $.get(currentStateLink, appendSkateparks).then(function () {
        $(window).scroll(infiniteScroll);
      });
    }
  }

  function showBackToTopLink() {
  }

  function renderSkateparks(response) {
    $(".parks-container").html(response);
    $("#back-to-top").hide();
  }

  function appendSkateparks(response) {
    var $skateparks = $($(response)[$(response).length - 1]).children();
    $skateparks.hide().appendTo(".selection.list").fadeIn(400);
    $("#back-to-top").show();
  }

  function updatePageNumber() {
    currentStateLink = currentStateLink.replace(/page=(\d+)/g, function(match, page) {
      return "page=" + (parseInt(page, 10) + 1);
    });
    pageCount++;
  }

  function morePagesLeft() {
    return pageCount < $("[data-total-pages]").data("total-pages");
  }
});

