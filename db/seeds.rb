require 'unix_colors'
require 'faker'
require 'open-uri'

def with_err_handling(&block)
  ActiveRecord::Base.transaction(&block)
rescue StandardError => e
  puts bold(red("\nBad stuff happened:\n")) + "  #{bold("#{e.class}: #{e.message}")}"
  puts red("  #{e.backtrace.first}")
end

with_err_handling do
  image_files = [
    File.open(Rails.root.join('public/newberg-01.jpg')),
    File.open(Rails.root.join('public/newberg-06.jpg'))
  ]

  puts bold 'Creating Skateparks...'
  lat = 33.891955
  long = -117.517648
  sizes = ['5,000', '8,000', '10,000', '13,000']
  hours = ['dawn - dusk', '9am - 5pm', '7am - 10pm']
  material = %w[concrete wood prefab]
  builder = ['grindline', 'dreamland', 'yo mamma']
  obstacles = ['rails',
               'ledges',
               'banks',
               'bowl',
               'quarterpipes',
               'bank to ledge',
               'bank to curb',
               'double set',
               'pyramid/funbox']

  skateparks = (1..200).map do |num|
    # create parks in clusters of 6
    if num.positive?
      if (num % 6).zero?
        lat += 0.42
        long -= 0.35
      else
        lat += 0.05
        if num.odd?
          long += 0.1
        else
          long -= 0.17
        end
      end
    end

    random_obstacle = Array(0..obstacles.length - 2).sample

    {
      name: "#{Faker::Creature::Animal.name} #{num} skatepark",
      city: "#{Faker::Tea.variety} #{num}",
      state: %w[california oregon washington].sample,
      address: Faker::Address.street_address,
      latitude: lat,
      longitude: long,
      stars: Array(1..5).sample,
      obstacles: obstacles.slice(random_obstacle, (obstacles.length - 1)),
      map_photo: image_files.first,
      size: sizes.sample,
      hours: hours.sample,
      material: material.sample,
      builder: builder.sample,
      designer: Faker::BossaNova.song,
      info: Faker::Hipster.sentence
    }
  end

  skateparks = Skatepark.create(skateparks)

  puts bold('Creating park images...')
  images = []
  image_files.each do |url|
    images.push(
      SkateparkImage.create(
        photo: url,
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

  puts bold('Seeding User data...')
  puts '  Creating admin...'
  admin = User.find_or_initialize_by(username: 'admin', admin: true)
  admin.update!(
    name: 'Reggie Ripman',
    email: 'admin@wcs.rip',
    password: 'admin123'
  )

  puts '  Giving admin some favs and visits...'
  thrashed, favs, visits = skateparks.each_slice(10).to_a
  admin.update!(
    favorites: thrashed + favs,
    visits: thrashed + visits
  )

  if User.count < 20
    puts '  Creating some Users...'
    users = (1..20).map do |i|
      {
        username: Faker::Internet.username,
        email: "swag#{i}@swag.swag",
        name: Faker::Name.name,
        password: Faker::Internet.password
      }
    end

    users = User.create(users)

    print '  Creating buttery Reviews & Ratings for some Skateparks...'
    skateparks.pluck(:id).map do |park_id|
      reviewer = users[rand(0...users.length)]
      reviews  = ['It sucked ass.', 'Chill.', 'Magnificent Crete.']

      rating = Rating.find_or_initialize_by(
        skatepark_id: park_id,
        user_id: reviewer.id
      )
      rating.update!(
        stars: rand(1..5),
        review: reviews.sample(1).first
      )
      print '.'
    end
  end

  puts bold(green('Done.'))
end
