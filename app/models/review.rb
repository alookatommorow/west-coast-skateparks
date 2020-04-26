# == Schema Information
#
# Table name: reviews
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  skatepark_id :integer
#  review       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :skatepark
  validates :user, :skatepark, :review, presence: true
end
