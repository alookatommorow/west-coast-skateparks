require 'open-uri'

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

  def skatepark_meta_title
    "#{@skatepark.name.titleize} - #{@skatepark.city.titleize}, #{state_abbrev[@skatepark.state]}"
  end

  def state_abbrev
    {
      "california" => "CA",
      "oregon" => "OR",
      "washington" => "WA",
    }
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

  def skateparks_json
    url = "https://s3-us-west-1.amazonaws.com/west-coast-skateparks/skateparks_json/skateparks.json"
    open(url) {|f| f.read }
  end
end
