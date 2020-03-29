FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "swaggy#{n}" }
    sequence(:email) { |n| "swag#{n}@swag.swag" }
    sequence(:name) { |n| "Swaggity#{n} Swag" }
    avatar   { nil }
    password { 'swagmethfout' }
    admin    { false }

    trait :admin do
      admin    { true }
      username { "admin" }
      email    { "admin@admin.admin" }
      password { "admin" }
    end
  end
end
