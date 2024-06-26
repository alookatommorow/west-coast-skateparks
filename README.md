# West Coast Skateparks
![Build Status](https://circleci.com/gh/alookatommorow/west-coast-skateparks.svg?style=shield&circle-token=8e91707df3579252f2c9c733a2968f29b83b2cd3)
[![Dependency Status](https://gemnasium.com/alookatommorow/west-coast-skateparks.svg)](https://gemnasium.com/alookatommorow/west-coast-skateparks)
[![Code Climate](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/gpa.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks)
[![Test Coverage](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/coverage.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/coverage)

West Coast Skateparks (WCS) is an informational directory of every skatepark in the western states of the United States (California, Oregon, and Washington).  Skatepark listings include an address and map for each skatepark along with other pertinent details such as hours, size, and date opened.  Users can track visits and favorites and leave ratings and reviews.  Pictures coming soon.

![Screenshot](https://storage.googleapis.com/john-hess/portfolio/wcs.png)

## Deployment
West Coast Skateparks is deployed using Heroku. Visit the app [here](https://www.west-coast-skateparks.com/)

## Technology
### Stack
* [Ruby on Rails](rubyonrails.org).
* [PostgreSQL](http://www.postgresql.org/).
* [Jquery](https://jquery.com/) and [AJAX](http://api.jquery.com/jquery.ajax/)
* [React](https://reactjs.org/) (skateparks search)
* [AWS S3](https://aws.amazon.com/s3/) (photo storage)

### Integrations
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/)
* [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in)
* [Facebook Login](https://developers.facebook.com/docs/facebook-login/web)
* [Weather Underground](https://www.wunderground.com/)

## Setup
#### React
##### Install Node 
1. Install Node with your preferred Node version manager
##### Setup Webpack Dev Server
1. install yarn `brew install yarn`
1. `yarn install`
1. run developement server `bin/shakapacker-dev-server`
#### Rails
##### Install Ruby
1. Install Ruby 3.2.2 with your preferred Ruby version manager
##### Install Bundler
1. `gem install bundler`
##### Install ImageMagick
1. `brew install imagemagick`
##### Setup Rails App
1. [Install Postgres](https://postgresapp.com/)
1. `bundle install`
1. `bundle exec rails db:setup`
1. `bundle exec rails s`
1. Open `http://localhost:3000` and get to it

## Contribute
If you would like to clone the repo and make a contribution, please feel free!

1. Clone repo (`git clone git@github.com:alookatommorow/west-coast-skateparks.git`)
1. Follow instructions to [setup local env](#setup)
1. Add some cool stuff
1. Open a PR
