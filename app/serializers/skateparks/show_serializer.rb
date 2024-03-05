module Skateparks
  class ShowSerializer < Skateparks::BaseSerializer
    attributes :id, :slug, :name, :city, :state, :map_photo, :stars, :obstacles, :hours, :material, :designer, :builder,
               :opened, :size, :lights, :address, :info, :average_rating
  end
end
