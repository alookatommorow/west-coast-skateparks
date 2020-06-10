module SkateparkHelper
  STATE_ABBREVS = {
    "california" => "CA",
    "oregon" => "OR",
    "washington" => "WA",
  }.freeze

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
    "#{skatepark} - #{skatepark.city.titleize}, #{STATE_ABBREVS[skatepark.state]}"
  end

  def skatepark_description(skatepark)
    "#{skatepark} in #{skatepark.city.titleize}, #{STATE_ABBREVS[skatepark.state]} - photos, map, and info"
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

  def skatepark_location(skatepark)
    (
      skatepark.address + ", " +
      skatepark.city.titleize + ", " +
      STATE_ABBREVS[skatepark.state] + " " +
      (skatepark.zip_code || "")
    ).strip
  end
end
