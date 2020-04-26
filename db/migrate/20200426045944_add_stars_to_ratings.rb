class AddStarsToRatings < ActiveRecord::Migration[5.0]
  def up
    add_column :ratings, :stars, :integer

    Rating.all.each do |rating|
      binding.pry if rating.rating.nil?
      rating.stars  = rating.rating.to_i
      rating.save!
    end
  end

  def down
    remove_column :ratings, :stars
  end
end
