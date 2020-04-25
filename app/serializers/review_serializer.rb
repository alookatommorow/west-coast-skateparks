class ReviewSerializer < ActiveModel::Serializer
  attributes :review, :avatar, :created_at, :author

  def avatar
    object.user&.avatar&.url(:thumb)
  end

  def author
    object.user.to_s
  end

  def created_at
    object.created_at.strftime("%m/%d/%y")
  end
end