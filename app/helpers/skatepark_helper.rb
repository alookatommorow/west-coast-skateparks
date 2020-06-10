module SkateparkHelper
  def rating_phrase
    {
      1 => ["Garbage", "Don't even bother, this place sucks"],
      2 => ["Less than ideal", "Far from perfect but there is fun to be had"],
      3 => ["Shredable", "Worth skating, a solid park"],
      4 => ["Epic", "Killer 'crete, more lines than you can shake a stick at"],
      5 => ["Holy Grail", "A concrete masterpiece holding a life's worth of skating"],
    }
  end

  def skatepark_og_meta_title(skatepark)
    "#{skatepark} - #{skatepark.city.titleize}, #{state_abbrevs[skatepark.state]}"
  end

  def skatepark_description(skatepark)
    "#{skatepark} in #{skatepark.city.titleize}, #{state_abbrevs[skatepark.state]} - photos, map, and info"
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

  def state_abbrevs
    Location::STATE_ABBREVS
  end

  def info_icons
    {
      "material" => "fa-layer-group",
      "opened" => "fa-baby",
      "info" => "fa-info",
      "designer" => "fa-drafting-compass",
      "builder" => "fa-hammer",
      "size" => "fa-ruler",
      "hours" => "fa-clock",
      "obstacles" => "fa-wave-square",
      "helmet" => "fa-hard-hat",
      "lights" => "fa-lightbulb",
    }
  end
end
