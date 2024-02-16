module Api
  module Maps
    class UserSerializer < BaseSerializer
      def self.serialize(user)
        both = user.favorites & user.visits
        visits = (user.visits - both).map { |park| json(park) }
        favorites = (user.favorites - both).map { |park| json(park) }

        {
          collections: [
            {
              type: 'favorite',
              items: favorites
            },
            {
              type: 'visited',
              items: visits
            },
            {
              type: 'both',
              items: both.map { |park| json(park) }
            }
          ]
        }
      end
    end
  end
end
