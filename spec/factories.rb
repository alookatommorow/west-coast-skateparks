FactoryBot.define do
  factory :skatepark do
    sequence(:name) { |i| "cribbage#{i}" }
    location

    trait :nearby do
      after(:build) do |skatepark|
        skatepark.location = build(:location, :nearby)
      end
    end

    trait :far do
      after(:build) do |skatepark|
        skatepark.location = build(:location, :far)
      end
    end

    trait :presentable do
      material 'bullshit garbage'
      opened nil
      builder 'bob'
      obstacles 'poo debris, debris'
      size '5000'
    end
  end

  factory :location do
    sequence(:city) { |i| "hayward#{i}" }
    state 'california'
    address '520 E 3rd Ave'
    latitude 35.0021
    longitude -113.0051

    trait :nearby do
      latitude 35.3045
      longitude -113.0380
    end

    trait :far do
      latitude 36.8021
      longitude -113.0051
    end
  end

  factory :user do
    sequence(:username) { |n| "swaggy#{n}" }
    sequence(:email) { |n| "swag#{n}@swag.swag" }
    sequence(:name) { |n| "Swaggity#{n} Swag" }
    avatar nil
    password 'swagmethfout'
    admin false

    trait :admin do
      admin true
    end
  end

  factory :favorite do
    user
    skatepark
  end

  factory :visit do
    user
    skatepark
  end

  factory :rating do
    user
    skatepark
    rating 5
  end

  factory :skatepark_image do
    skatepark
    photo_file_name { "test_image.png" }
    photo_content_type { 'image/png' }
  end
end
