module Weather
  class Client
    include HTTParty

    def initialize(lat, long)
      @query = "#{lat},#{long}"
    end

    base_uri "http://api.wunderground.com/api"

    def weather
      response = self.class.get("/#{ENV.fetch('WEATHER_KEY')}/conditions/q/#{@query}.json").parsed_response["current_observation"]
      {
        icon_url: response["icon_url"],
        weather: response["weather"],
        temp_f: response["temp_f"]
      }
    end
  end
end