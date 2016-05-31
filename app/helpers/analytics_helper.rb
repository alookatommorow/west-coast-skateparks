module AnalyticsHelper
  def identify_hash(user = current_user)
    {
      created: user.created_at,
      email: user.email,
      user_name: user.name,
      username: user.username,
    }
  end

  def skatepark_json(skatepark)
    {
      skatepark_id: skatepark.id,
      skatepark_name: skatepark.name,
      city: skatepark.city,
      state: skatepark.state,
      favorite_count: skatepark.favorites.count,
      visit_count: skatepark.visits.count,
      admin_rating: skatepark.rating,
    }.to_json
  end
end
