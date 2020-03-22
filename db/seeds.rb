# This file seeds User data, for Skatepark related data see `dev:restore_skateparks` Rake task
require "unix_colors"

unless Rails.env.development?
  abort bold("Only run this in development environment. For prodlike environments use `heroku:pg:backups`")
end

def with_err_handling
  ActiveRecord::Base.transaction do
    yield
  end
rescue => e
  puts bold(red("\nBad stuff happened:\n")) + "  #{bold("#{e.class}: #{e.message}")}"
  puts red("  #{e.backtrace.first}")
end

with_err_handling do
  puts bold("Seeding User data...")
  puts "  Creating admin..."
  admin = User.find_or_initialize_by(username: 'admin', admin: true)
  admin.update!(
    name: "Reggie Ripman",
    email: "admin@wcs.rip",
    password: "admin123",
  )

  skateparks = Skatepark.take(30)
  if skateparks.empty?
    abort "\nNeed to seed skateparks first. Please run `#{bold("rails dev:restore_skateparks")}` and try again, or run `#{bold("rails dev:reset_db")}`"
  end

  puts "  Giving admin some favs and visits..."
  thrashed, favs, visits = skateparks.each_slice(10).to_a
  admin.update!(
    favorites: thrashed + favs,
    visits: thrashed + visits,
  )

  users = User.where("email LIKE '%barnaby%'")
  if users.count < 20
    puts "  Creating some Users..."
    user_info = 20.times.map do |i|
      {
        name: "Barnaby ##{i + 1}",
        username: "barnaby_#{i + 1}",
        email: "barnaby#{i + 1}@wcs.rip",
        password: "123thrash",
      }
    end
    # This shit's slow, we should update rails to v6 and use User#upsert_all bc it's buttery
    users = User.create!(user_info)
  end

  print "  Creating buttery Reviews & Ratings for some Skateparks..."
  skateparks.pluck(:id).map do |park_id|
    reviewer = users[rand(0...users.length)]
    rating = Rating.find_or_initialize_by(
      skatepark_id: park_id,
      user_id: reviewer.id,
    )
    rating.update!(rating: rand(1..5)) # Magnificent Crete. 1 star. Heh

    review = Review.find_or_initialize_by(
      skatepark_id: park_id,
      user_id: reviewer.id,
    )
    review.update!(review: ['It sucked ass.', 'Chill.', 'Magnificent Crete.'].sample(1))
    print "."
  end
  puts

  puts bold(green("Done."))
end
