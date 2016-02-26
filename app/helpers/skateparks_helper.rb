module SkateparksHelper
  def header_url(skatepark)
    "https://storage.googleapis.com/west-coast-skateparks/#{skatepark.state}/#{skatepark.identifier}-header.jpg"
  end
end
