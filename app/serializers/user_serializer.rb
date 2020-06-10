class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_many :favorites
  has_many :visits
  has_many :dups

  def favorites
    object.favorites - dups
  end

  def visits
    object.visits - dups
  end

  def dups
    object.favorites & object.visits
  end
end
