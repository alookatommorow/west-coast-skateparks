export const slickSettings = isDesktop => ({
  dots: true,
  speed: 500,
  slidesToShow: 1,
  variableWidth: isDesktop,
  centerMode: isDesktop,
  slidesToScroll: 1,
})