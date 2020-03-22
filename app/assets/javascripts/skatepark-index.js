$(document).on('turbolinks:load', function() {
  var pageCount = 1;
  var currentStateLink;

  //////// Show skateparks by state ////////
  $("a[data-state-link]").on("click", function(event){
    event.preventDefault();
    if ($(this).hasClass("active")) {
      return;
    }
    trackStateLinkClick(this); // .bind failed TravisCI
    pageCount = 1;
    currentStateLink = this.href;

    $(".active").removeClass("active");
    $(this).addClass("active");
    showLoader();

    if ($(".state-label-mobile").css("display") !== "none") {
      $(".show-mobile-menu").show();
      $(".state-menu").slideUp(function(){
        $.get(this.href, renderSkateparks);
      }.bind(this));
    } else {
      $.get(this.href, renderSkateparks);
    }
  });

  /////// Show skateparks by letter or state header ////////
  $(".parks-container").on("click", "a[data-state-link], a[data-skatepark-letter-link]", function(event) {
    event.preventDefault();
    pageCount = 1;
    currentStateLink = this.href;

    showLoader();
    $.get(this.href, renderSkateparks);
  });

  /////// Click show menu (mobile) ////////
  $(".parks-container").on("click", ".show-mobile-menu", function(){
    $(".state-menu").slideDown();
    $(".show-mobile-menu").hide();
  });

  ////// show skateparks ajax callback //////
  function renderSkateparks(response) {
    $(".parks-container").html(response);
    $("#back-to-top").css("display", "none");
  }

  ////// show loader //////
  function showLoader() {
    $(".state-list").hide();
    $(".loading-container").show();
  }

  ////// infinite scroll //////
  $(window).scroll(infiniteScroll);

  function infiniteScroll() {
    var scrolledToBottom = ($(document).height() - $(window).height()) - 500 <= $(window).scrollTop();
    var morePagesLeft = pageCount < $("[data-total-pages]").data("total-pages");

    if (scrolledToBottom && currentStateLink && morePagesLeft) {
      updatePageNumber();
      $(window).off("scroll");
      $.get(currentStateLink, appendSkateparks).then(function () {
        $(window).scroll(infiniteScroll);
      });
    }
  }

  function appendSkateparks(response) {
    var $skateparks = $($(response)[$(response).length - 1]).children();
    $skateparks.hide().appendTo(".state-list").fadeIn(400);
    $("#back-to-top").css("display", "flex");
  }

  function updatePageNumber() {
    currentStateLink = currentStateLink.replace(/page=(\d+)/g, function(match, page) {
      return "page=" + (parseInt(page, 10) + 1);
    });
    pageCount++;
  }

  function trackStateLinkClick(link) {
    if (window.analytics) {
      var state = $(link).data("state-link") || $(link).data("mobile-state-link");
      analytics.track("Clicked State Link", { state: state });
    }
  }

  // bug fixes for resizing, worth it?
  if (window.location.pathname === '/skateparks') {
    $(window).resize(function() {
      if (window.innerWidth > 767 ) {
        if ($(".state-menu").css("display") !== "flex") {
          $(".state-menu").css("display", "flex");
          $(".show-mobile-menu").hide();
        }
      } else {
        if ($(".state-menu").css("display") !== "none" && $(".parks-container").children().length > 1) {
          $(".state-menu").css("display", "inline-block")
          $(".show-mobile-menu").show();
          $(".state-menu").slideUp();
        }
      }
    });
  }
});
