module SkateparkHelper
  def rating_phrase
    {
      1 => ["Garbage", "Don't even bother, this place sucks"],
      2 => ["Less than ideal", "Not amazing but there is fun to be had"],
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
end
