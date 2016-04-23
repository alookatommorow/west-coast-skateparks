namespace :locations do
  desc 'Downcase location fields'
  task downcase: :environment do
    Location.all.each do |loc|
      loc.city = loc.city.downcase
      loc.state = loc.state.downcase
      loc.save
    end
  end
end