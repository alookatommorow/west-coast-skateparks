require 'csv'
require 'geokit'
# What classes do you need?

# Remember, there are four high-level responsibilities, each of which have multiple sub-responsibilities:
# 1. Gathering user input and taking the appropriate action (controller)
# 2. Displaying information to the user (view)
# 3. Reading and writing from the todo.txt file (persisting models to non-volatile storage, aka "the hard drive")
# 4. Manipulating the in-memory objects that model a real-life TODO list (model)

# Note that (4) is where the essence of your application lives.
# Pretty much every application in the universe has some version of responsibilities (1), (2), and (3).


class List
  include Geokit::Geocoders
  attr_reader :addresses

  def initialize
    @addresses = []
  end

  def populate_list(filename)
    CSV.foreach(filename) do |address|
      # @addresses << address
      # string_version =  address.to_s
      p address
      if address.any?
        coords = MultiGeocoder.geocode(address.to_s)
        @addresses.push([coords.lat, coords.lng])
      else
        @addresses.push([0, 0])
      end
      sleep(0.25)
    end
  end

  def save(file)
    CSV.open(file, 'w') do |csv|
      @addresses.each do |address|
        p address
        csv << address
      end
    end
  end

end

list = List.new
list.populate_list('Skateparks2.csv')
# list.user_input(ARGV)
list.save('Skateparks2.csv')
