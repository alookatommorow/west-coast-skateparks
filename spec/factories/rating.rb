FactoryBot.define do
  factory :rating do
    user
    skatepark
    rating { 5 }
  end
end
