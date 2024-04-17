class RatingSerializer < Serialization::BaseSerializer
  attributes :stars, :review, :avatar, :author, :author_id, :created_at

  def avatar(rating = serializeable)
    rating.user&.avatar&.url(:thumb)
  end

  def author(rating = serializeable)
    rating.user&.to_s
  end

  def author_id(rating = serializeable)
    rating.user_id
  end

  def created_at(rating = serializeable)
    rating.created_at.strftime('%m/%d/%y')
  end
end
