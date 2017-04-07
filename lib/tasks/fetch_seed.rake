namespace :db do
  desc 'Fetch fresh seed file from Dropbox'
  task :fetch_seed do
    if Rails.env.development?
      if system "cp ~/Dropbox/WCS/skatepark_seed.csv db/ && cp ~/Dropbox/WCS/location_seed.csv db/"
        puts "Fresh seed file has been fetched..."
      else
        puts "Seed file could not be fetched!"
        exit
      end
    else
      puts "No need to fetch seed!"
    end
  end
end
