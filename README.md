#West Coast Skateparks

West Coast Skateparks is an informational directory of every skatepark in the western states of the United States (California, Oregon, and Washington).  Skatepark listings include an address and map for each skatepark along with other pertinent details such as hours, size, and date opened.  Users can track visits and favorites and leave ratings and reviews.  Pictures coming soon.

![Screenshot](https://github.com/alookatommorow/west-coast-skateparks/blob/master/public/wcsp.jpg)

##Deployment

West Coast Skateparks is deployed to Heroku. Visit the app [here](https://vast-island-2935.herokuapp.com/)

##Instructions for Use

To view the skatepark directory, click "Skateparks" on the navigation bar then select a state.  You may also search for a skatepark by city name using the search bar.

###Directions

To get directions to a skatepark, enter your address in the field below the map and click "Get Directions."  You will be taken to Google Maps.

###Create an Account

For added features, create an account using the "Sign Up" button on the nav bar.  You will need to enter a username, e-mail, and password.

Once you create an account you can sign in and sign out using the nav bar.  As a registered user you will have a profile page that enables you to track which skateparks you have visited and which are your favorite.

###Log a Visit, Favorite

On the display page for a given skatepark, click the "Been Here" button to add that skatepark to the list of skateparks you have visited. Click "Never Been Here" to remove that skatepark from the list of skateparks you have visited.

On the display page for a given skatepark, click the "Add Favorite" button to add that skatepark to the list of your favorite skateparks. Click "Remove Favorite" to remove it.

###Ratings and Reviews

Once you have visited a skatepark, you are given the option of giving it a rating or writing a review.  Your rating will be aggregated with other user ratings to give an average user ratings.  To rate the skatepark click "Rate Skatepark" and use the dropdown form to give a rating.

To review the skatepark click "Review Skatepark" and write a review in the dropdown form.  Your review will be shown on that skatepark's page.

##Technology

West Coast Skateparks was created using [Ruby on Rails](rubyonrails.org).  The database is [PostgreSQL](http://www.postgresql.org/). Dynamic content is added using [Jquery](https://jquery.com/) and [AJAX](http://api.jquery.com/jquery.ajax/).

West Coast Skateparks uses [Semantic UI](http://semantic-ui.com/) for front-end pleasantries.

Maps are generated using the [Google Maps API](https://developers.google.com/maps/documentation/javascript/).

##Code Sample

###Search

The search is triggered using JQuery and Ajax in application.js:

```javascript
$('.search-form').on('submit', function(event){
  event.preventDefault();
  var url = $(this).attr('action');
  var data = {search: $(this).find("input[name='search']").val()}
  $.ajax({url: url, data: data, dataType: 'JSON'}).done(function(response) {
    $(".search-results-container").remove();
    $(".search-container").append(response.partial);
  });

});
```

The search action in the skateparks controller takes the search query and checks skatepark names and locations for a match and sorts the results.  It sends back a partial in JSON format:

```ruby
def search
  if params[:search]
    @skateparks = Skatepark.where("name LIKE ? OR city LIKE ? OR state LIKE ?", "%" +params[:search].downcase + "%", "%" +params[:search].downcase + "%", "%" +params[:search].downcase + "%").order("state ASC").order("city ASC").order("name ASC")

    respond_to do |format|
      format.json {render json: {partial: render_to_string('_search.html.erb', layout: false)} }
    end
  end
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