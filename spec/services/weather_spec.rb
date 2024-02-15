require 'rails_helper'

RSpec.describe Weather::Client do
  let(:lat) { 69 }
  let(:lng) { 666 }
  let(:response) { instance_double(HTTParty::Response) }
  let(:api_res) do
    {
      'current' => {
        'temp_f' => 46.9,
        'condition' => {
          'text' => 'Partly cloudy',
          'icon' => '//cdn.weatherapi.com/weather/64x64/night/116.png'
        }
      }
    }
  end

  let(:subject) { described_class.new(lat, lng).weather }

  before do
    allow(described_class).to receive(:get).and_return(response)
    allow(response).to receive(:parsed_response).and_return(api_res)
  end

  it 'fetches weather from weather API' do
    weather = subject

    expect(described_class).to have_received(:get).with(
      '/current.json', {
        query: {
          key: ENV['WEATHER_KEY'],
          q: "#{lat},#{lng}"
        }
      }
    )
    expect(weather).to eq({
                            icon_url: api_res['current']['condition']['icon'],
                            weather: api_res['current']['condition']['text'],
                            temp_f: api_res['current']['temp_f']
                          })
  end
end
