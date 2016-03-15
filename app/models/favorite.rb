class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :skatepark
  #validates :user, :skatepark, presence: true
end
