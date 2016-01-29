namespace :db do
  desc 'Drop, create, migrate then seed the development database'
  task reseed: [ 'db:drop', 'db:create', 'db:migrate', 'db:fetch_seed', 'db:seed' ] do
    puts 'Reseeding completed.'
  end
end
