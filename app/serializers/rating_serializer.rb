class RatingSerializer < ActiveModel::Serializer
  attributes :stars,
             :review,
             :avatar,
             :author,
             :author_id,
             :created_at,
             :new_average

  def avatar
    object.user&.avatar&.url(:thumb)
  end

  def author
    object.user.to_s
  end

  def author_id
    object.user_id
  end

  def created_at
    object.created_at.strftime('%m/%d/%y')
  end

  def new_average
    @instance_options[:new_average]
  end
end
