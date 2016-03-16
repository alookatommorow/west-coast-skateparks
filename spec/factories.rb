FactoryGirl.define do
  factory :skatepark do
    sequence(:city) { |i| "hayward#{i}" }
    state 'California'
    address '520 E 3rd Ave, Hayward, CA'
    sequence(:name) {|i| "cribbage#{i}" }
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
    # sequence(:name) { |n| "Swaggity#{n} Swag" }
    name nil
    avatar nil
    password 'swag'
    admin false

    trait :admin do
      admin true
    end
  end

  # look into build_stubbed
  factory :favorite do
    user
    skatepark
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
