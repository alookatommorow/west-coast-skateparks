$(document).on('turbolinks:load', function() {
  var $dropdown = $(".dropdown:not(i)");

  ///  toggle dropdown  ///
  $(".dropdown:not(i), .dropdown.icon").click(function(event) {
    event.stopPropagation();

    toggleDropdown();
  });

  /// handle menu item click ///
  $(".dropdown .menu .item").click(function(event) {
    event.stopPropagation();

    var selectedVal = $(this).data("value");

    $(this).parent().parent().removeClass("error");
    $(this).parent().siblings("input").val(selectedVal);
    $(this).parent().siblings(".text").removeClass("default").text(selectedVal);
    hideDropdownMenu();
  });


  function toggleDropdown() {
    if ($dropdown.hasClass("active")) {
      $dropdown.children(".menu").slideToggle(200, function() {
        $dropdown.removeClass("active upward");
        unbindDropdownCloseListener();
      });
    } else {
      var distanceToBottom = $(window).scrollTop() + $(window).height() - $dropdown.offset().top;
      var classString = distanceToBottom < 273 ? "active upward" : "active";
      $dropdown.addClass(classString);
      bindDropdownCloseListener();
      $dropdown.children(".menu").slideToggle(200);
    }
  }

  function hideDropdownMenu() {
    $(".dropdown:not(i)").removeClass("active upward").children(".menu").hide();
    unbindDropdownCloseListener();
  }

  function unbindDropdownCloseListener() {
    $(document).unbind("click");
  }

  function bindDropdownCloseListener() {
    $(document).click(function() {
      hideDropdownMenu();
    });
  }
});