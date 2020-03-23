# West Coast Skateparks
![Build Status](https://circleci.com/gh/alookatommorow/west-coast-skateparks.svg?style=shield&circle-token=8e91707df3579252f2c9c733a2968f29b83b2cd3)
[![Dependency Status](https://gemnasium.com/alookatommorow/west-coast-skateparks.svg)](https://gemnasium.com/alookatommorow/west-coast-skateparks)
[![Code Climate](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/gpa.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks)
[![Test Coverage](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/badges/coverage.svg)](https://codeclimate.com/github/alookatommorow/west-coast-skateparks/coverage)

West Coast Skateparks (WCS) is an informational directory of every skatepark in the western states of the United States (California, Oregon, and Washington).  Skatepark listings include an address and map for each skatepark along with other pertinent details such as hours, size, and date opened.  Users can track visits and favorites and leave ratings and reviews.  Pictures coming soon.

![Screenshot](https://storage.googleapis.com/john-hess/portfolio/wcs.png)

## Deployment
West Coast Skateparks is deployed to Heroku. Visit the app [here](https://west-coast-skateparks.herokuapp.com/)

## Technology
### Stack
* [Ruby on Rails](rubyonrails.org).
* [PostgreSQL](http://www.postgresql.org/).
* [Jquery](https://jquery.com/) and [AJAX](http://api.jquery.com/jquery.ajax/)
* [React](https://reactjs.org/) (skateparks search)
* [AWS S3](https://aws.amazon.com/s3/) (photo storage)
* [Butter CMS](https://buttercms.com/) (blog)

### Integrations
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/)
* [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in)
* [Facebook Login](https://developers.facebook.com/docs/facebook-login/web)
* [Weather Underground](https://www.wunderground.com/)

## Local Env Setup
### Fresh Install
#### React
##### Install Node
1. `brew install nvm`
1. `nvm install v12` (or latest)
1. `nvm alias default v12`
##### Setup Webpack Dev Server
1. `brew install yarn`
1. `cd /path/to/west-coast-skateparks && yarn install`
1. `bin/webpack-dev-server`
#### Rails
##### Install Ruby
1. [Install rbenv](https://github.com/rbenv/rbenv#installation)
1. `rbenv install 2.4.2`
1. `gem install bundler`
##### Setup Rails App
1. [Install Postgres](https://postgresapp.com/)
1. `cd /path/to/west-coast-skateparks && bundle install`
1. `rails dev:reset_db` (Requires heroku access, otherwise use `rails db:setup`)
1. `bundle exec rails s`
1. Open `http://localhost:3000` and get to it

### Local DB Skateparks
These tasks can be used to keep your local data as prodlike as possible. Each of them is idempotent and can be run as many times as you want. _Note: You'll need access to heroku to use these._

`rails dev:restore_skateparks`

 Downloads a dump of prod Skateparks and overwrites local DB with them. _Any Reviews, Ratings, Favorites, etc. that local users have with Skateparks will be lost._

`rails dev:seed_db`

 Restores Skateparks, seeds an Admin user and some Reviews/Ratings. _This will not overwrite any existing users you've created._

`rails dev:reset_db`

 Performs both the actions above after dropping, creating, and migrating your local DB. _This will overwrite all local data, so be 100% sure before you use it._

## Contribute
If you would like to clone the repo and make a contribution, please feel free!

1. Clone repo (`git clone git@github.com:alookatommorow/west-coast-skateparks.git`)
1. Follow instructions to [setup local env](#local-env-setup)
1. Add some cool stuff
1. Make sure tests pass
1. Put in a PR
