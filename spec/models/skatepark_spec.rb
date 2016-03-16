require 'rails_helper'

RSpec.describe Skatepark, type: :model do
  context '#map_data' do
    it 'returns a hash with data needed for map generation' do
      skatepark = create_list(:skatepark, 2).first

      expected = {
        skateparks: {
          nearby: skatepark.nearby_parks.map(&:hashify_with_pictures),
          main: [skatepark.hashify_with_pictures]
        },
        mapCenter: [skatepark.latitude, skatepark.longitude],
        zoom: 9
      }

      expect(skatepark.map_data).to eq(expected)
    end

    it 'assigns empty array as value of nearby key' do
      skatepark = create(:skatepark)

      expected = {
        skateparks: {
          nearby: [],
          main: [skatepark.hashify_with_pictures]
        },
        mapCenter: [skatepark.latitude, skatepark.longitude],
        zoom: 9
      }

      expect(skatepark.map_data).to eq(expected)
    end
  end

  context '.in_state' do
    it 'returns a collection of all parks in that state in ascending order by city name' do
      skateparks = create_list(:skatepark, 2, state: 'california')
      out_of_state = create(:skatepark, state: 'dummyland')

      california_parks = Skatepark.in_state(skateparks[0].state)
      expect(california_parks).to eq(skateparks)
      expect(california_parks).to_not include(out_of_state)
    end
  end

  context '#pictures' do
    it 'returns an array with the correct photo urls' do
      skatepark = create(:skatepark)
      expect(skatepark.pictures).to eq([
        generate_image_url(skatepark, 1),
        generate_image_url(skatepark, 2),
        generate_image_url(skatepark, 3)])
    end

    it 'returns an empty array if no pics' do
      skatepark = create(:skatepark, num_pics: 0)
      expect(skatepark.pictures).to eq([])
    end
  end

  context '#first_picture' do
    it 'should return the url of the first picture' do
      skatepark = create(:skatepark)

      expect(skatepark.first_picture).to eq(generate_image_url(skatepark, 1))
    end

    it 'should return the wcs logo if no image' do
      skatepark = create(:skatepark, num_pics: 0)

      expect(skatepark.first_picture).to eq('https://storage.googleapis.com/west-coast-skateparks/logo-small.png')
    end
  end

  context '#nearby_parks' do
    it 'returns an array of nearby skateparks' do
      skatepark = create(:skatepark)
      nearby_park = create(:skatepark, :nearby)
      far_far_away = create(:skatepark, :far)

      expect(skatepark.nearby_parks).to include(nearby_park)
      expect(skatepark.nearby_parks).to_not include(far_far_away)
    end
  end

  context '#coordinates?' do
    it 'returns true if the skatepark has latitude and longitude' do
      skatepark = create(:skatepark)
      expect(skatepark.coordinates?).to be_truthy
    end

    it 'returns false if the skatepark does not have latitude or longitude' do
      skatepark = create(:skatepark, latitude: nil)
      expect(skatepark.coordinates?).to be_falsey
    end
  end

  context '#favorited_by?' do
    it 'returns true if skatepark has been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

      expect(skatepark.favorited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.favorited_by?(user)).to be false
    end
  end

  context '#visited_by?' do
    it 'returns true if skatepark has been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      expect(skatepark.visited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.visited_by?(user)).to be false
    end
  end

  context '#ratings?' do
    it 'returns true when a skatepark has ratings' do
      user = create(:user)
      skatepark = create(:skatepark)

      Rating.create(
        user_id: user.id, skatepark_id: skatepark.id, rating: 5)

      expect(skatepark.ratings?).to be true
    end
  end

  context '#reviews?' do
    it 'returns true when a skatepark has reviews' do
      user = create(:user)
      skatepark = create(:skatepark)

      Review.create(
        user_id: user.id, skatepark_id: skatepark.id, review: 'meh')

      expect(skatepark.reviews?).to be true
    end
  end
end

def generate_image_url(skatepark, pic_num)
  "https://storage.googleapis.com/west-coast-skateparks/#{skatepark.state}/#{skatepark.identifier}-0#{pic_num}.jpg"
end
