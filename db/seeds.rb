require 'csv'
require 'forgery'

CSV.foreach('db/skatepark_seed.csv', headers: true, header_converters: :symbol, encoding:'iso-8859-1:utf-8') do |row|
  Skatepark.create(Hash[row])
end

CSV.foreach('db/location_seed.csv', headers: true, header_converters: :symbol, encoding:'iso-8859-1:utf-8') do |row|
  Location.create(Hash[row])
end

puts 'Skateparks have been seeded'

abort unless Rails.env.development?

# admin
index = { favorite: 0, visit: 0 }
admin = User.create(
  username: 'admin', email: 'admin@admin.admin', password: 'admin1234', admin: true)

# trashed parks for admin
20.times do
  admin.favorites << Skatepark.find(index[:favorite] += 1)
  admin.visited_parks << Skatepark.find(index[:visit] += 1)
end

# favorites for admin
20.times do
  admin.favorites << Skatepark.find(index[:favorite] += 1)
  index[:visit] += 1
end

# visited parks for admin
20.times do
  admin.visited_parks << Skatepark.find(index[:visit] += 1)
end

# create users
20.times do
  user = User.create(
    username: Forgery('name').full_name, email: Forgery('email').address, password: "123thrash")

  20.times do |park_id|
    Review.create(
      skatepark_id: park_id,
      user_id: user.id,
      review: Forgery('name').job_title * 4)
    Rating.create(skatepark_id: park_id, user_id: user.id, rating: rand(1..5))
  end
end
puts 'Associations have been created'
