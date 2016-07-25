module ApplicationHelper
  def non_header_page?
    current_page?(root_path) ||
      current_page?(new_session_path) ||
      current_page?(new_user_path) ||
      @skatepark
  end

  def num_empty_stars(rating)
    5 - rating.to_f.ceil
  end

  def num_half_stars(rating)
    rating.to_f % 1 == 0 ? 0 : 1
  end

  def num_stars(rating)
    rating.to_f.floor
  end
end
