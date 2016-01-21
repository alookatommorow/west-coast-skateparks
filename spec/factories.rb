FactoryGirl.define do
  #these tests depend on geocoding
  #also, figure out how to make factories for join tables
  factory :skatepark do
    city 'Hayward'
    state 'California'
    address '520 E 3rd Ave, Hayward, CA'
    identifier 'swag'

    trait :other do
      city 'SW4GL4ND'
      state 'California'
      address '26251 Hesperian Blvd, Hayward, CA'
      identifier 'SWAGNIFICENT'
    end
  end

  factory :user do
    username 'swaggy'
    password 'swag'
    email 'swag@swag.swag'
  end

  factory :favorite do
    user_id 1
    skatepark_id 1
  end

  factory :visit do
    user_id 1
    skatepark_id 1
  end
end
