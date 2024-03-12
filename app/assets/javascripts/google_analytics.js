$(document).on('turbolinks:load', function () {
  $('[data-ga-event]').on('click', function (event) {
    const eventParameters = $(event.currentTarget).data('ga-event');

    window.gtag('event', 'custom_click', eventParameters);
  });
});
