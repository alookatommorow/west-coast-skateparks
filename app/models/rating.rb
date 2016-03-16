class Rating < ActiveRecord::Base
  belongs_to :user
  belongs_to :skatepark
  validates :user, :skatepark, :rating, presence: true
end