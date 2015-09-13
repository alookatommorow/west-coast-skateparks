module SkateparkConcern

  extend ActiveSupport::Concern

  included do
    helper_method :user_has_skatepark
    helper_method :new_user_skatepark
    helper_method :favorite
    helper_method :visit
  end

  def user_has_skatepark(user_id, skatepark_id)
    @user_has_skatepark = UserSkatepark.where(user_id: user_id).where(skatepark_id: skatepark_id).last
  end

  def new_user_skatepark(user_id, skatepark_id)
    @new_user_skatepark = UserSkatepark.create(user_id: user_id, skatepark_id: skatepark_id)
  end

  def favorite(user_id, skatepark_id)
    if user_has_skatepark(user_id, skatepark_id)
      found_skatepark = user_has_skatepark(user_id, skatepark_id)
      found_skatepark.favorite = !found_skatepark.favorite
      found_skatepark.save
    else
      new_user_skatepark = new_user_skatepark(user_id, skatepark_id)
      new_user_skatepark.favorite = true
      new_user_skatepark.save
    end
  end


  def visit(user_id, skatepark_id)
    if user_has_skatepark(user_id, skatepark_id)
      found_skatepark = user_has_skatepark(user_id, skatepark_id)
      found_skatepark.visited = !found_skatepark.visited
      found_skatepark.save
    else
      new_user_skatepark = new_user_skatepark(user_id, skatepark_id)
      new_user_skatepark.visited = true
      new_user_skatepark.save
    end
  end

  def rate_skatepark(user_id, skatepark_id, rating)
    user_has_skatepark = user_has_skatepark(user_id, skatepark_id)
    user_has_skatepark.rating = rating
    user_has_skatepark.save
  end

end