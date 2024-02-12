require "unix_colors"
require "faker"
require "open-uri"

def with_err_handling
  ActiveRecord::Base.transaction do
    yield
  end
rescue => e
  puts bold(red("\nBad stuff happened:\n")) + "  #{bold("#{e.class}: #{e.message}")}"
  puts red("  #{e.backtrace.first}")
end

with_err_handling do
  puts bold "Creating Skateparks..."
  skateparks = (1..40).map do
    {
      name: "#{Faker::Creature::Animal.unique.name} skatepark",
      city: Faker::Tea.unique.variety,
      state: ['california', 'oregon', 'washington'].sample,
      address: Faker::Address.street_address,
      latitude: Faker::Address.latitude,
      longitude: Faker::Address.longitude,
    }
  end

  Skatepark.create(skateparks)
  skateparks = Skatepark.all

  puts bold("Creating park images...")
  images = []
  urls = [
    'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/808/original/newberg-01.jpg?1459399047',
    'https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skatepark_images/photos/000/001/813/original/newberg-06.jpg?1459399056'
  ]

  urls.each do |url|
    images.push(
      SkateparkImage.create(
        photo: URI.parse(url),
        skatepark: skateparks.first
      )
    )
  end
  (1..skateparks.length - 1).each do |i|
    images.each do |image|
      new_image = image.dup
      new_image.skatepark = skateparks[i]
      new_image.save
    end
  end


  puts bold("Seeding User data...")
  puts "  Creating admin..."
  admin = User.find_or_initialize_by(username: 'admin', admin: true)
  admin.update!(
    name: "Reggie Ripman",
    email: "admin@wcs.rip",
    password: "admin123",
  )

  puts "  Giving admin some favs and visits..."
  thrashed, favs, visits = skateparks.each_slice(10).to_a
  admin.update!(
    favorites: thrashed + favs,
    visits: thrashed + visits,
  )

  if User.count < 20
    puts "  Creating some Users..."
    users = (1..20).map do |i|
      {
        username: Faker::Internet.username,
        email: "swag#{i}@swag.swag",
        name: Faker::Name.name,
        password: Faker::Internet.password,
      }
    end

    User.create(users)
    users = User.all

    print "  Creating buttery Reviews & Ratings for some Skateparks..."
    skateparks.pluck(:id).map do |park_id|
      reviewer = users[rand(0...users.length)]
      reviews  = ['It sucked ass.', 'Chill.', 'Magnificent Crete.']

      rating = Rating.find_or_initialize_by(
        skatepark_id: park_id,
        user_id: reviewer.id,
      )
      rating.update!(
        stars: rand(1..5),
        review: reviews.sample(1).first,
      )
      print "."
    end
  end

  puts bold(green("Done."))
end
