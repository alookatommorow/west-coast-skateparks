require 'rails_helper'

RSpec.describe Skatepark, type: :model do
  context '#map_data' do
    it 'returns a hash with data needed for map generation' do
      skatepark = create(:skatepark)
      create(:skatepark, identifier: "areolaland")

      expected = {
        skateparks: {
          nearby: skatepark.nearby_parks.map(&:hashify_with_pictures),
          main: [skatepark.hashify_with_pictures],
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
          main: [skatepark.hashify_with_pictures],
        },
        mapCenter: [skatepark.latitude, skatepark.longitude],
        zoom: 9
      }

      expect(skatepark.map_data).to eq(expected)
    end


  end

  context '.in_state' do
    it 'returns a collection of all parks in that state in ascending order by city name' do
      skateparks = [create(:skatepark, name: 'ZAMN'), create(:skatepark)]
      out_of_state = create(:skatepark, state: 'dummyland')

      california_parks = Skatepark.in_state(skateparks[0].state)
      expect(california_parks).to eq(skateparks)
      expect(california_parks).to_not include(out_of_state)
    end
  end

  #### ADD test for hashify_with_pictures and rename to hashify w/ pics (or something)

  context '#pictures' do
    it 'returns an array with the correct photo urls' do
      skatepark = create(:skatepark)
      expect(skatepark.pictures).to eq(
        [
          generate_image_url(skatepark, 1),
          generate_image_url(skatepark, 2),
          generate_image_url(skatepark, 3),
        ]
      )

    end

    it 'returns an empty array if no pics' do
      skatepark = create(:skatepark, :other)
      expect(skatepark.pictures).to eq([])
    end
  end

  context '#first_picture' do
    it 'should return the url of the first picture' do
      skatepark = create(:skatepark)
      expect(skatepark.first_picture).to eq(generate_image_url(skatepark, 1))
    end

    it 'should return the wcs logo if no image' do
      skatepark = create(:skatepark, :other)
      expect(skatepark.first_picture).to eq("https://storage.googleapis.com/west-coast-skateparks/logo-small.png")
    end
  end

  context '#nearby_parks' do
    it 'returns an array of nearby skateparks' do
      skatepark = create(:skatepark, latitude: 35.0021, longitude: -113.0051)
      skatepark2 = create(:skatepark, identifier: 'turdmonger', latitude: 35.3045, longitude: -113.0380)
      skatepark3 = create(:skatepark, identifier: 'buttgoblin', latitude: 36.8021, longitude: -113.0051)

      expect(skatepark.nearby_parks).to include(skatepark2)
      expect(skatepark.nearby_parks).to_not include(skatepark3)

    end
  end

  context '#has_coordinates?' do
    it 'returns true if the skatepark has latitude and longitude' do
      skatepark = create(:skatepark)
      expect(skatepark.has_coordinates?).to be_truthy
    end

    it 'returns false if the skatepark does not have latitude or longitude' do
      skatepark = create(:skatepark, latitude: nil)
      expect(skatepark.has_coordinates?).to be_falsey
    end
  end

  context '#already_favorited_by?' do
    it 'returns true if skatepark has been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      skatepark.users_who_faved << user

      expect(skatepark.already_favorited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.already_favorited_by?(user)).to be false
    end
  end

  context '#already_visited_by?' do
    it 'returns true if skatepark has been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      skatepark.users_who_visited << user

      expect(skatepark.already_visited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.already_visited_by?(user)).to be false
    end
  end

  context '#has_ratings?' do
    it 'returns true when a skatepark has ratings' do
      user = create(:user)
      skatepark = create(:skatepark)

      Rating.create(
        user_id: user.id, skatepark_id: skatepark.id, rating: 5)

      expect(skatepark.has_ratings?).to be true
    end
  end

  context '#has_reviews?' do
    it 'returns true when a skatepark has reviews' do
      user = create(:user)
      skatepark = create(:skatepark)

      Review.create(
        user_id: user.id, skatepark_id: skatepark.id, review: 'meh')

      expect(skatepark.has_reviews?).to be true
    end
  end

  context '#average_rating' do
    it 'returns the average of all ratings for a skatepark' do
      user = create(:user)
      guy = create(:user, username: 'guy', email: 'guy@guy.guy')
      girl = create(:user, username: 'girl', email: 'girl@girl.girl')
      skatepark = create(:skatepark)

      Rating.create(
        user_id: user.id, skatepark_id: skatepark.id, rating: 5)
      Rating.create(
        user_id: guy.id, skatepark_id: skatepark.id, rating: 3)
      Rating.create(
        user_id: girl.id, skatepark_id: skatepark.id, rating: 1)

      expect(skatepark.average_rating).to eq(3)
    end
  end
end

def generate_image_url(skatepark, pic_num)
  "https://storage.googleapis.com/west-coast-skateparks/#{skatepark.state}/#{skatepark.identifier}-0#{pic_num}.jpg"
end