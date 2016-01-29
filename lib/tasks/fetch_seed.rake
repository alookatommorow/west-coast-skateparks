namespace :db do
  desc 'Fetch fresh seed file from Dropbox'
  task :fetch_seed do
    if system "cp ~/Dropbox/WCS/skatepark_seed.csv db/"
      puts "Fresh seed file has been fetched..."
    else
      puts "Seed file could not be fetched!"
      exit
    end
  end
end
