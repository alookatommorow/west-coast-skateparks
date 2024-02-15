# == Schema Information
#
# Table name: ratings
#
#  id           :integer          not null, primary key
#  rating       :float
#  review       :text
#  stars        :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  skatepark_id :integer
#  user_id      :integer
#
# Indexes
#
#  index_ratings_on_skatepark_id              (skatepark_id)
#  index_ratings_on_user_id                   (user_id)
#  index_ratings_on_user_id_and_skatepark_id  (user_id,skatepark_id)
#
class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :skatepark

  validates :user,      presence: true
  validates :skatepark, presence: true
  validates :stars,     presence: true

  validates :stars, inclusion: 1..5

  validate :two_max_per_user_per_park, on: :create

  private

  def two_max_per_user_per_park
    return if self.class.where(skatepark:, user:).count < 2

    errors.add(:user, "can't have more than two ratings per park")
  end
end
