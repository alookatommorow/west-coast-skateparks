class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_many :favorites
  has_many :visited_parks
  has_many :dups

  def favorites
    object.favorites.includes(:location) - dups
  end

  def visited_parks
    object.visited_parks.includes(:location) - dups
  end

  def dups
    object.favorites & object.visited_parks
  end
end
