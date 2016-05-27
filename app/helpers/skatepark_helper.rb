module SkateparkHelper
  def rating_phrase
    {
      1 => ["Garbage", "Don't even bother, this place sucks"],
      2 => ["Less than ideal", "Not amazing but there is fun to be had"],
      3 => ["Shredable", "Worth skating, a solid park"],
      4 => ["Epic", "Nearly flawless, more lines than you can shake a stick at"],
      5 => ["Holy Grail", "A crown jewel holding a life's worth of skating"],
    }
  end
end