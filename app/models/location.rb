class Location < ActiveRecord::Base
  belongs_to :skatepark

  validates :city, :state, presence: true
end