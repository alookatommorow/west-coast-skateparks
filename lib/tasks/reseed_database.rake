namespace :db do
  desc 'Drop, create, migrate then seed the development database'
  task reseed: [ 'db:refresh', 'db:migrate', 'db:fetch_seed', 'db:seed' ] do
    puts 'Reseeding completed.'
  end
end
