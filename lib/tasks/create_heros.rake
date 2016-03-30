namespace :heros  do
  desc 'Feeds image urls to paperclip to create heros'
  task :create => :environment do
    Skatepark.all.each do |skatepark|
      if skatepark.num_pics > 0
        skatepark.update_attribute(:hero, URI.parse(URI.encode("https://storage.googleapis.com/west-coast-skateparks/#{skatepark.state}/#{skatepark.identifier}-header.jpg")))
      end
    end
  end
end