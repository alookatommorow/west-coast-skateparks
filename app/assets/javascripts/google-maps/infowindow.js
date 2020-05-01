// wrapper around google maps infowindow to add our custom setup
// while exposing a simple constructor to the MAPBUILDER
function InfoWindow(skatepark) {
  this.stars = {};
  this.skatepark = skatepark;
  this.rating = skatepark.rating;

  return new this.gMapsInfoWindow({
    content: this.generateContentString(skatepark)
  });
}

InfoWindow.prototype.generateContentString = function() {
  this.countStars();
  var skatepark = this.skatepark,
      generatedStarIcons = this.generateStarHtml();

  // id='content' is a Google Maps requirement
  return "<div id='content'><a href='/skateparks/" + skatepark.slug + "'><div><img loading='lazy' src='"+skatepark.map_photo+ "' ></div><strong>"+titleize(skatepark.name)+"</strong><div>" + titleize(skatepark.city) + "</div><div>" + generatedStarIcons + "</div></a></div>";
};

InfoWindow.prototype.countStars = function() {
  var stars = this.stars,
      rating = this.rating;

  stars.wholeStars = parseInt(rating, 10);
  if (Number(rating) % 1 !== 0) {
    stars.halfStars = 1;
  } else {
    stars.halfStars = 0;
  }
  stars.emptyStars = 5- Math.ceil(Number(rating));
};

InfoWindow.prototype.generateStarHtml = function() {
  var stars = this.stars,
      starIcons = {
        wholeStars: "<i class='fa fa-star'></i>",
        halfStars: "<i class='fa fa-star-half-o.'></i>",
        emptyStars: "<i class='fa fa-star-o'></i>"
      },
      starString = "";

  for (var star in stars) {
    if (stars[star] > 0) {
      for (var i = 0; i < stars[star]; i++) {
        starString += starIcons[star];
      }
    }
  }

  return starString;
};
