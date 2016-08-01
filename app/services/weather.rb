module Weather
  class Client
    include HTTParty

    def initialize(lat, long)
      @query = "#{lat},#{long}"
    end

    base_uri "http://api.wunderground.com/api/#{ENV.fetch('WEATHER_KEY')}/conditions/q"

    def weather
      response = self.class.get("/#{@query}.json").parsed_response["current_observation"]
    end
  end
end