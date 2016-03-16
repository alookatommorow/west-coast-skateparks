#West Coast Skateparks
[![Build Status](https://travis-ci.org/alookatommorow/west-coast-skateparks.svg?branch=master)](https://travis-ci.org/alookatommorow/west-coast-skateparks)
[![Dependency Status](https://gemnasium.com/alookatommorow/west-coast-skateparks.svg)](https://gemnasium.com/alookatommorow/west-coast-skateparks)
[![Code Climate](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/gpa.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks)
[![Test Coverage](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/coverage.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/coverage)

West Coast Skateparks (WCS) is an informational directory of every skatepark in the western states of the United States (California, Oregon, and Washington).  Skatepark listings include an address and map for each skatepark along with other pertinent details such as hours, size, and date opened.  Users can track visits and favorites and leave ratings and reviews.  Pictures coming soon.

![Screenshot](https://github.com/alookatommorow/west-coast-skateparks/blob/master/public/wcs.jpg)

##Deployment

West Coast Skateparks is deployed to Heroku. Visit the app [here](https://west-coast-skateparks.herokuapp.com/)

##Technology

West Coast Skateparks was created using [Ruby on Rails](rubyonrails.org).  The database is [PostgreSQL](http://www.postgresql.org/). Dynamic content is added using [Jquery](https://jquery.com/) and [AJAX](http://api.jquery.com/jquery.ajax/).

West Coast Skateparks uses [Semantic UI](http://semantic-ui.com/) for front-end pleasantries.

Maps are generated using the [Google Maps API](https://developers.google.com/maps/documentation/javascript/).

##Code Sample

### Ajax module

The Ajax module provides reusable functionality for making dynamic requests triggered by submission of a form or click of a link:

```javascript
var AJAX = (function(){
  var requests = {
    form: function(event) {
      return $.ajax({
        url: $(event.target).attr('action'),
        data: $(event.target).serialize(),
        method: $(event.target).attr('method')
      });
    },

    link: function(event) {
      return $.ajax({
        url: $(event.target).attr('href')
      });
    }
  };

  return function (event, callback) {
    var request;
    var comingFromAform = $(event.target).attr('action');

    if (comingFromAform) {
      request = requests.form(event);
    } else {
      request = requests.link(event);
    }

    request.done(function(response) {
      callback(response, event);
    });
    request.fail(function(response){
      console.log(response, event);
    });

    event.preventDefault();
  };
}());
```

###Search

The search employs the Ajax module to execute the search: 

```javascript
$('.search-form').on('submit', function(event) {
    AJAX(event, appendSearchResultsToContainer);
});
```
callback:

```javascript
var appendSearchResultsToContainer = function (response) {
    $(".search-container").empty().append(response);
};
```

The `skateparks#search` action in the controller calls the `skatepark#search` method, which takes the search query and checks skatepark names and locations for a match and sorts the results.  It sends back a partial to be appended to the DOM:

```ruby
def search
    @skateparks = Skatepark.search(params[:search].downcase)
    render partial: 'search_results', locals: {
      skateparks: @skateparks }
end
```

`Skatepark#search` method:

```ruby
def self.search(target)
    where(
      'name LIKE ? OR city LIKE ? OR state LIKE ?',
      '%' + target + '%',
      '%' + target + '%',
      '%' + target + '%'
    ).order('state ASC').order('city ASC').order('name ASC')
end
```

##Contribute

WCS is a work in progress.  Pending the final touches to the database and a UI/UX enhancement, the app will be officially launched, making it the premiere source for skatepark information in the western U.S.  If you would like to clone the repo and make a contribution, please feel free!

Clone the repo from your command line

`git clone https://github.com/alookatommorow/west-coast-skateparks.git`

Navigate to the west-coast-skateparks folder

Bundle install

`bundle install`

Create, migrate and seed the database

`rake db:create && rake db:migrate && rake db:seed`

Start the Rails server

`rails s`

Open your browser and navigate to localhost:3000/
