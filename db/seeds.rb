require "unix_colors"
require "factory_bot_rails"

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
  ['california', 'oregon', 'washington'].each do |state|
    FactoryBot.create_list(:skatepark, 10, state: state)
  end

  puts bold("Seeding User data...")
  puts "  Creating admin..."
  admin = User.find_or_initialize_by(username: 'admin', admin: true)
  admin.update!(
    name: "Reggie Ripman",
    email: "admin@wcs.rip",
    password: "admin123",
  )

  skateparks = Skatepark.all

  puts "  Giving admin some favs and visits..."
  thrashed, favs, visits = skateparks.each_slice(10).to_a
  admin.update!(
    favorites: thrashed + favs,
    visits: thrashed + visits,
  )

  if User.count < 20
    puts "  Creating some Users..."
    users = FactoryBot.create_list(:user, 20)

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
