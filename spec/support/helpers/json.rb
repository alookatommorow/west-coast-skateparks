module Helpers
  module Json
    def json_body
      JSON.parse(response.body)
    end
  end
end
