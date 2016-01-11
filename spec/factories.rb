FactoryGirl.define do
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
