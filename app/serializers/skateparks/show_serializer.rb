module Skateparks
  class ShowSerializer < BaseSerializer
    attributes :id, :slug, :name, :city, :state, :map_photo, :stars, :obstacles, :hours, :material, :designer, :builder,
               :opened, :size, :lights, :address, :info, :average_rating, :status, :latitude, :longitude

    has_many :skatepark_images, key: :photos
    has_many :ratings
  end
end
