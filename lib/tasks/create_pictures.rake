namespace :images  do
  desc 'Feeds image urls to paperclip to create skatepark images'
  task :create => :environment do
    Skatepark.all.each do |skatepark|
      skatepark.pictures.each do |url|
        SkateparkImage.create(
          skatepark_id: skatepark.id,
          photo: URI.parse(URI.encode(url))
          )
      end
    end
  end
end
