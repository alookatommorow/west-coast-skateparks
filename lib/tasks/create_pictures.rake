namespace :images  do
  desc 'Feeds image urls to paperclip to create skatepark images'
  task :create => :environment do
    skatepark = Skatepark.find(31)
    skatepark.pictures.each do |url|
      SkateparkImage.create(
        skatepark_id: skatepark.id,
        photo: URI.parse(URI.encode(url))
        )
    end
  end
end
