FactoryBot.define do
  factory :skatepark do
    sequence(:name) { |i| "cribbage#{i}" }
    location

    trait :nearby do
      after(:build) do |skatepark|
        skatepark.location = build(:location, :nearby)
      end
    end

    trait :far do
      after(:build) do |skatepark|
        skatepark.location = build(:location, :far)
      end
    end

    trait :presentable do
      material  { 'bullshit garbage' }
      opened    { nil }
      builder   { 'bob' }
      obstacles { 'poo debris, debris' }
      size      { '5000' }
    end
  end
end
