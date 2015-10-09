#West Coast Skateparks

West Coast Skateparks is an informational directory of every skatepark in the western states of the United States (California, Oregon, and Washington).  Skatepark listings include an address and map for each skatepark along with other pertinent details such as hours, size, and date opened.  Pictures coming soon.

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

West Coast Skateparks was created using [Ruby on Rails](rubyonrails.org).  Dynamic content is added using [Jquery](https://jquery.com/) and [AJAX](http://api.jquery.com/jquery.ajax/).

West Coast Skateparks uses [Semantic UI](http://semantic-ui.com/) for front-end pleasantries.

Maps are generated using the [Google Maps API](https://developers.google.com/maps/documentation/javascript/).

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