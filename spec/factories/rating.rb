FactoryBot.define do
  factory :rating do
    user
    skatepark
    stars { 5 }
  end
end
