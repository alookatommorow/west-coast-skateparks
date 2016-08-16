function infowindowGenerator(skatepark) {
  var stars = {};
  var starIcons = {
    wholeStars: "<i class='small star icon'></i>",
    halfStars: "<i class='small star half empty icon'></i>",
    emptyStars: "<i class='small star icon shaded'></i>"
  }

  this.generateInfowindow = function() {
    return new google.maps.InfoWindow({
      content: generateContentString(skatepark)
    });
  };

  function generateContentString(skatepark) {
    // id='content' is a Google Maps requirement
    countStars(skatepark.rating);
    starIcons = generateStarHtml();
    return "<div id='content'><a href='/skateparks/"+skatepark.slug+"'><div><img src='"+skatepark.picture+ "' ></div><strong>"+titleize(skatepark.name)+"</strong><div>" + starIcons + "</div></a></div>";
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
