module SkateparkConcern

  extend ActiveSupport::Concern

  included do
    helper_method :user_has_skatepark
    helper_method :new_user_skatepark
    helper_method :favorite
    helper_method :visit
    helper_method :get_lat_long
    helper_method :has_review?
    helper_method :has_user_rating?
  end

  def user_has_skatepark(user_id, skatepark_id)
    UserSkatepark.where(user_id: user_id).where(skatepark_id: skatepark_id).last
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

  def user_has_favorite(user_id, skatepark_id)
    if user_has_skatepark(user_id, skatepark_id)
      if user_has_skatepark(user_id, skatepark_id).favorite == true
        return true
      end
    else
      return false
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

  def review_skatepark(user_id, skatepark_id, review, username)
    user_has_skatepark = user_has_skatepark(user_id, skatepark_id)
    user_has_skatepark.review = review
    user_has_skatepark.username = username
    user_has_skatepark.review_date = Time.now.strftime("%m/%d/%y")
    user_has_skatepark.save
  end

  def user_rating(skatepark_id)
    ratings = 0
    all_user_skateparks = UserSkatepark.where(skatepark_id: skatepark_id)
    all_user_skateparks.each do |user_park|
      unless user_park.rating.blank?
        ratings += user_park.rating
      end
    end
    unless ratings == 0
      return ratings/all_user_skateparks.count
    end
  end

  def has_review?(skatepark_id)
    all_user_skateparks = UserSkatepark.where(skatepark_id: skatepark_id)
    num_reviews = 0
    all_user_skateparks.each do |park|
      if park.review != nil
        num_reviews += 1
      end
    end
    if num_reviews > 0
      return true
    else
      return false
    end
  end

  def has_user_rating?(skatepark_id)
    all_user_skateparks = UserSkatepark.where(skatepark_id: skatepark_id)
    num_ratings = 0
    all_user_skateparks.each do |park|
      if park.rating != nil
        num_ratings += 1
      end
    end
    if num_ratings > 0
      return true
    else
      return false
    end

  end

  def get_lat_long
    lat_long = []
    coords = MultiGeocoder.geocode(self.address)
    lat_long.push(coords.lat)
    lat_long.push(coords.lng)
    lat_long
  end

  def search

  end





end