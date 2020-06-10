# == Schema Information
#
# Table name: locations
#
#  id           :integer          not null, primary key
#  address      :string
#  city         :string
#  latitude     :float
#  longitude    :float
#  state        :string
#  zip_code     :string
#  skatepark_id :integer
#
# Indexes
#
#  index_locations_on_skatepark_id  (skatepark_id)
#
# Foreign Keys
#
#  fk_rails_...  (skatepark_id => skateparks.id)
#
class Location < ActiveRecord::Base


  belongs_to :skatepark
  validates :city, :state, presence: true
end
