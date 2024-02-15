module Weather
  class Client
    include HTTParty
    base_uri 'http://api.weatherapi.com/v1'

    def initialize(lat, lng)
      @options = {
        query: {
          key: ENV.fetch('WEATHER_KEY'),
          q: "#{lat},#{lng}"
        }
      }
    end

    def weather
      response = self.class.get('/current.json', options).parsed_response
      {
        icon_url: response['current']['condition']['icon'],
        weather: response['current']['condition']['text'],
        temp_f: response['current']['temp_f']
      }
    end

    private

    attr_reader :options
  end
end
