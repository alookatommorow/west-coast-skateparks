FactoryGirl.define do
  #these tests depend on geocoding
  #also, figure out how to make factories for join tables
  factory :skatepark do
    city 'Hayward'
    state 'California'
    address '520 E 3rd Ave, Hayward, CA'
  end

  factory :user do
    username 'swaggy'
    password 'swag'
    email 'swag@swag.swag'
  end

end
