def stub_weather
  allow(Weather::Client).to receive(:new).and_return(weather_client)
end

def weather_client
  double("Weather::Client").tap do |sc|
    allow(sc).to receive(:weather).and_return(weather_hash)
  end
end

def weather_hash
  {
    :icon_url => "http://icons.wxug.com/i/c/k/cloudy.gif",
    :weather => "Overcast",
    :temp_f => 57.5
  }
end

def stub_skateparks_json
  allow_any_instance_of(SkateparkHelper).to receive(:skateparks_json).and_return(test_skateparks_json)
end

def test_skateparks_json
  skateparks = Skatepark.includes(:location).all.as_json(
          only: [:id, :name],
          include: { location:
            { only: [:city, :state] }
          })
end