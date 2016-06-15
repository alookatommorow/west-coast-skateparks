function infowindowGenerator(skatepark) {

  this.generateInfowindow = function() {
    return new google.maps.InfoWindow({
      content: generateContentString(skatepark)
    });
  }

  function generateContentString(skatepark) {
    // id='content' is a Google Maps requirement
    return "<div id='content' style='height:50%'><div class='center-text two-bottom'><img style='height:50px' src='"+skatepark.picture+ "' ></div><strong><a href='/skateparks/"+skatepark.id+"'>"+titleize(skatepark.name)+"</a></strong></div>";
  }
}