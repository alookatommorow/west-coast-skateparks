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

  # factory :user_skatepark do
  #   association :user
  #   association :skatepark
  # end


  # factory :skatepark do
  #   city 'Hayward'
  #   state 'California'
  #   address '520 E 3rd Ave, Hayward, CA'

  #   factory :skatepark_with_user do

  #     ignore do
  #       users_count 1
  #     end

  #     after(:create) do |skatepark, evaluator|
  #       FactoryGirl.create_list(:user_skatepark, evaluator.users_count, skatepark: skatepark)
  #     end
  #   end
  # end

  # factory :user do
  #   username 'swaggy'
  #   password 'swag'
  #   email 'swag@swag.swag'

  #   factory :user_with_skateparks do

  #     ignore do
  #       skateparks_count 1
  #     end

  #     after(:create) do |user, evaluator|
  #       FactoryGirl.create_list(:user_skatepark, evaluator.skateparks_count, user: user)
  #     end
  #   end
  # end

end
