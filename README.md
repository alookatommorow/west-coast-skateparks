#West Coast Skateparks
[![Build Status](https://travis-ci.org/alookatommorow/west-coast-skateparks.svg?branch=master)](https://travis-ci.org/alookatommorow/west-coast-skateparks)
[![Dependency Status](https://gemnasium.com/alookatommorow/west-coast-skateparks.svg)](https://gemnasium.com/alookatommorow/west-coast-skateparks)

West Coast Skateparks is an informational directory of every skatepark in the western states of the United States (California, Oregon, and Washington).  Skatepark listings include an address and map for each skatepark along with other pertinent details such as hours, size, and date opened.  Users can track visits and favorites and leave ratings and reviews.  Pictures coming soon.

![Screenshot](https://github.com/alookatommorow/west-coast-skateparks/blob/master/public/wcsp.jpg)

##Deployment

West Coast Skateparks is deployed to Heroku. Visit the app [here](https://west-coast-skateparks.herokuapp.com/)

##Instructions for Use

To view the skatepark directory, click "Skateparks" on the navigation bar then select a state.  You may also search for a skatepark by city name using the search bar.

##Technology

West Coast Skateparks was created using [Ruby on Rails](rubyonrails.org).  The database is [PostgreSQL](http://www.postgresql.org/). Dynamic content is added using [Jquery](https://jquery.com/) and [AJAX](http://api.jquery.com/jquery.ajax/).

West Coast Skateparks uses [Semantic UI](http://semantic-ui.com/) for front-end pleasantries.

Maps are generated using the [Google Maps API](https://developers.google.com/maps/documentation/javascript/).

##Code Sample

###Search

The search is triggered using JQuery and Ajax in search.js:

```javascript
$('.search-form').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({url: url, data: data})
    .done(function(response) {
      $(".search-results-container").remove();
      $(".search-container").append(response);
    })
    .fail(function(response){
      console.error(response);
    })
  });
```

The `skateparks#search` action in the controller calls the `skatepark#search` method, which takes the search query and checks skatepark names and locations for a match and sorts the results.  It sends back a partial in JSON format:

```ruby
def search
  if params[:search]
    skateparks = Skatepark.search(params[:search].downcase)
    render partial: 'search', locals: {skateparks: skateparks}
  end
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

The above javaScript first removes any search results that may already be there, then appends the partial that was sent back as JSON from the controller.  The search results container is closed and the value of the search form is reset using JQuery:

```javascript
$(".search-container").on('click', '.close-search', function(){
  $(this).parent().slideToggle(400, function(){});
  $('.search-form').find("input[name='search']").val('');
});
```

##Contribute

West Coast Skateparks is a work in progress.  Pending the consolidation of more skatepark information and front-end improvements, pictures and embedded video will be added.  If you would like to clone the repo and make a contribution, please feel free!

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
