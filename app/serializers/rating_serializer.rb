class RatingSerializer < BaseSerializer
  class << self
    attributes :stars,
               :review,
               :avatar,
               :author,
               :author_id,
               :created_at

    def avatar(rating)
      rating.user&.avatar&.url(:thumb)
    end

    def author(rating)
      rating.user&.to_s
    end

    def author_id(rating)
      rating.user_id
    end

    def created_at(rating)
      rating.created_at.strftime('%m/%d/%y')
    end
  end
end
