namespace :db do
  desc 'Refreshes the database in any environment'
  task :refresh do
    if Rails.env.production?
      system 'heroku pg:reset DATABASE_URL'
    else
      Rake::Task['db:drop'].invoke
      Rake::Task['db:create'].invoke
    end
    puts 'DB REFRESHED'
  end
end
