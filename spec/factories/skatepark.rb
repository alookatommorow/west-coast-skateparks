FactoryBot.define do
  factory :skatepark do
    sequence(:name) { |i| "cribbage#{i}" }
    sequence(:city) { |i| "hayward#{i}" }
    state     { 'california' }
    address   { '520 E 3rd Ave' }
    latitude  { 35.0021 }
    longitude { -113.0051 }

    trait :nearby do
      latitude  { 35.3045 }
      longitude { -113.0380 }
    end

    trait :far do
      latitude  { 36.8021 }
      longitude { -113.0051 }
    end
  end
end
