function infowindowGenerator(skatepark) {
  var stars = {};
  var starIcons = {
    wholeStars: "<i class='fa fa-star'></i>",
    halfStars: "<i class='fa fa-star-half-o.'></i>",
    emptyStars: "<i class='fa fa-star-o'></i>"
  };

  this.generateInfowindow = function() {
    return new google.maps.InfoWindow({
      content: generateContentString(skatepark)
    });
  };

  function generateContentString(skatepark) {
    // id='content' is a Google Maps requirement
    countStars(skatepark.rating);
    starIcons = generateStarHtml();
    return "<div id='content'><a href='/skateparks/"+skatepark.slug+"'><div><img src='"+skatepark.map_photo+ "' ></div><strong>"+titleize(skatepark.name)+"</strong><div>" + titleize(skatepark.city) + "</div><div>" + starIcons + "</div></a></div>";
  }

  function countStars(rating) {
    stars.wholeStars = parseInt(rating, 10);
    if (Number(rating) % 1 !== 0) {
      stars.halfStars = 1;
    } else {
      stars.halfStars = 0;
    }
    stars.emptyStars = 5- Math.ceil(Number(rating));
  }

  function generateStarHtml() {
    starString = "";
    for (var star in stars) {
      if (stars[star] > 0) {
        for (var i = 0; i < stars[star]; i++) {
          starString += starIcons[star];
        }
      }
    }
    return starString;
  }
}
