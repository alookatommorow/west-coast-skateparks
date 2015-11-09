# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#little change for heroku
require 'csv'

CSV.foreach('db/Skateparks5.csv', headers: true, header_converters: :symbol, ) do |row|
  Skatepark.create(Hash[row])
end
