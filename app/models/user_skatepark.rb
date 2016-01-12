class UserSkatepark < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :user
  belongs_to :skatepark

  # Dont allow 0 values
  def self.user_rating(skatepark_id)
    all_user_skateparks = self.where(skatepark_id: skatepark_id)
    count = all_user_skateparks.count
    ratings = 0

    all_user_skateparks.each do |user_park|
      ratings += user_park.rating if user_park.rating
    end

    return ratings/count if count > 0
  end
end
