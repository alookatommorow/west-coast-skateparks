class WelcomeController < ApplicationController
  def index
    response = Google::Client.new.get_pics
    # response = RestClient.get("https://www.googleapis.com/storage/v1/b/west-coast-skateparks/o?key=<%= ENV['GOOGLE_KEY'] %>")
    p response
  end

  def google

  end
end
