FactoryBot.define do
  factory :skatepark_image do
    skatepark
    photo_file_name { 'test_image.png' }
    photo_content_type { 'image/png' }
  end
end
