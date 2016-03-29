FactoryGirl.define do
  factory :skatepark do
    sequence(:city) { |i| "hayward#{i}" }
    state 'California'
    address '520 E 3rd Ave, Hayward, CA'
    sequence(:name) { |i| "cribbage#{i}" }
    sequence(:identifier) { |i| "swag#{i}" }
    latitude 35.0021
    longitude -113.0051
    num_pics 3

    trait :nearby do
      latitude 35.3045
      longitude -113.0380
    end

    trait :far do
      latitude 36.8021
      longitude -113.0051
    end

    trait :presentable do
      material 'bullshit garbage'
      opened nil
      builder 'bob'
      obstacles 'poo debris, debris'
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
    photo File.new(Rails.root + 'public/test_image.png')
  end
end
