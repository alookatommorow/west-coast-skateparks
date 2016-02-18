FactoryGirl.define do
  factory :skatepark do
    city 'Hayward'
    state 'California'
    address '520 E 3rd Ave, Hayward, CA'
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
  end

  factory :user do
    sequence(:username) { |n| "swaggy#{n}" }
    sequence(:email) { |n| "swag#{n}@swag.swag" }
    name nil
    uid nil
    password 'swag'

    trait :admin do
      admin true
    end
  end

  # look into build_stubbed
  factory :favorite do
    user_id 420
    skatepark_id 420
  end

  factory :visit do
    user_id 420
    skatepark_id 420
  end

  factory :rating do
    user_id 420
    skatepark_id 420
    rating 5
  end
end
