require 'csv'

CSV.foreach('db/Skateparks4.csv', headers: true, header_converters: :symbol, ) do |row|
  Skatepark.create(Hash[row])
end
