class RatingSerializer < Serialization::BaseSerializer
  attributes :stars, :review, :avatar, :author, :author_id, :created_at

  def avatar
    record.user&.avatar&.url(:thumb)
  end

  def author
    record.user&.to_s
  end

  def author_id
    record.user_id
  end

  def created_at
    record.created_at.strftime('%m/%d/%y')
  end
end
