namespace :map_photos  do
  desc 'Feeds image urls to paperclip to create map_photos'
  task :create => :environment do
    Skatepark.all.each do |skatepark|
      if skatepark.num_pics > 0
        skatepark.update_attribute(:map_photo, URI.parse(URI.encode("https://storage.googleapis.com/west-coast-skateparks/#{skatepark.state}/#{skatepark.identifier}-01.jpg")))
      end
    end
  end
end