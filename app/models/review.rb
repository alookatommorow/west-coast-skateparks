class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :skatepark
  validates :user, :skatepark, :review, presence: true
end
