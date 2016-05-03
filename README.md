#West Coast Skateparks
[![Build Status](https://travis-ci.org/alookatommorow/west-coast-skateparks.svg?branch=master)](https://travis-ci.org/alookatommorow/west-coast-skateparks)
[![Dependency Status](https://gemnasium.com/alookatommorow/west-coast-skateparks.svg)](https://gemnasium.com/alookatommorow/west-coast-skateparks)
[![Code Climate](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/gpa.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks)
[![Test Coverage](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/coverage.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/coverage)

West Coast Skateparks (WCS) is an informational directory of every skatepark in the western states of the United States (California, Oregon, and Washington).  Skatepark listings include an address and map for each skatepark along with other pertinent details such as hours, size, and date opened.  Users can track visits and favorites and leave ratings and reviews.  Pictures coming soon.

![Screenshot](https://github.com/alookatommorow/west-coast-skateparks/blob/master/public/wcs.png)

##Deployment

West Coast Skateparks is deployed to Heroku. Visit the app [here](https://west-coast-skateparks.herokuapp.com/)

##Technology

West Coast Skateparks was created using [Ruby on Rails](rubyonrails.org).  The database is [PostgreSQL](http://www.postgresql.org/). Dynamic content is added using [Jquery](https://jquery.com/) and [AJAX](http://api.jquery.com/jquery.ajax/).

West Coast Skateparks uses [Semantic UI](http://semantic-ui.com/) for front-end pleasantries.

Maps are generated using the [Google Maps API](https://developers.google.com/maps/documentation/javascript/).

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
