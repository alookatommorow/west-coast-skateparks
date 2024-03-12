$(document).on('turbolinks:load', () => {
  $('[data-ga-event]').on('click', event => {
    const eventParameters = $(event.currentTarget).data('ga-event');

    window.gtag('event', 'custom_click', eventParameters);
  });
});
