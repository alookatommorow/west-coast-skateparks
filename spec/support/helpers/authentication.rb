module Helpers
  module Authentication
    def sign_in(user)
      allow(User).to receive(:find_by).with(id: nil).and_return user
    end
  end
end
