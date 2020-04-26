# == Schema Information
#
# Table name: reviews
#
#  id           :integer          not null, primary key
#  review       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  skatepark_id :integer
#  user_id      :integer
#
# Indexes
#
#  index_reviews_on_skatepark_id              (skatepark_id)
#  index_reviews_on_user_id                   (user_id)
#  index_reviews_on_user_id_and_skatepark_id  (user_id,skatepark_id) UNIQUE
#
class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :skatepark
  validates :user, :skatepark, :review, presence: true
end
