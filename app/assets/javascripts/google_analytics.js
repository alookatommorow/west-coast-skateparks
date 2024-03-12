$(document).on('turbolinks:load', function () {
  $('[data-ga-event]').on('click', function (event) {
    var eventParameters = $(event.currentTarget).data('ga-event');

    window.gtag('event', 'custom_click', eventParameters);
  });
});
