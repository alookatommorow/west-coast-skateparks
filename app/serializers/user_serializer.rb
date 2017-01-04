class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_many :favorite_parks
  has_many :visited_parks
  has_many :dups

  def favorite_parks
    object.favorite_parks.includes(:location) - dups
  end

  def visited_parks
    object.visited_parks.includes(:location) - dups
  end

  def dups
    object.favorite_parks & object.visited_parks
  end
end
