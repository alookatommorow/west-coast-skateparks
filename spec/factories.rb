FactoryGirl.define do
  #these tests depend on geocoding
  #also, figure out how to make factories for join tables
  factory :skatepark do
    city 'Hayward'
    state 'California'
    address '520 E 3rd Ave, Hayward, CA'
    identifier 'swag'
    latitude 53.0456
    longitude -113.6547
    num_pics 3

    trait :other do
      city 'SW4GL4ND'
      state 'California'
      address '26251 Hesperian Blvd, Hayward, CA'
      identifier 'SWAGNIFICENT'
      num_pics 0
    end
  end

  factory :user do
    sequence(:username) { |n| "swaggy#{n}" }
    sequence(:email) { |n| "swag#{n}@swag.swag" }
    password 'swag'
  end

  factory :favorite do
    user_id 420
    skatepark_id 420
  end

  factory :visit do
    user_id 420
    skatepark_id 420
  end
end
