require 'csv'

CSV.foreach('db/Skateparks5.csv', headers: true, header_converters: :symbol, ) do |row|
  Skatepark.create(Hash[row])
end
