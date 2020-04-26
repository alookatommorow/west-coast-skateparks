# == Schema Information
#
# Table name: ratings
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  skatepark_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  stars        :integer          not null
#  review       :text
#
class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :skatepark

  validates :user,      presence: true
  validates :skatepark, presence: true

  # TODO: Validate 1..5
  validates :stars,     presence: true
end
