class Neighbor < ActiveRecord::Base
  belongs_to :skatepark
  belongs_to :neighbor_park, class_name: "Skatepark"

  after_create :create_inverse, unless: :has_inverse?
  after_destroy :destroy_inverse, if: :has_inverse?

  def create_inverse
    self.class.create(inverse_match_options)
  end

  def destroy_inverse
    inverses.destroy_all
  end

  def has_inverse?
    self.class.exists?(inverse_match_options)
  end

  private

    def inverses
      self.class.where(inverse_match_options)
    end

    def inverse_match_options
      { skatepark_id: neighbor_park_id, neighbor_park_id: skatepark_id }
    end
end
