namespace :images  do
  desc 'Feeds image urls to paperclip to create skatepark images'
  task :create_one => :environment do
    (1..250).each do |num|
      skatepark = Skatepark.find(num)
      if skatepark.num_pics > 0
        (1..skatepark.num_pics).each do |num|
          SkateparkImage.create(
            skatepark_id: skatepark.id,
            photo: URI.parse(URI.encode("https://storage.googleapis.com/west-coast-skateparks/#{skatepark.state}/#{skatepark.identifier}-0#{num}.jpg"))
            )
        end
      end
    end
  end
end
