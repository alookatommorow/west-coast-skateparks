require 'rails_helper'

RSpec.describe FlashesHelper, type: :helper do
  describe '#user_facing_flashes' do
    it 'returns a hash of all user faces flash keys' do
      flash.now[:error] = 'swag'
      flash.now[:alert] = 'swag'
      flash.now[:notice] = 'swag'
      flash.now[:success] = 'swag'
      flash.now[:stuff] = 'HEY'
      expect(user_facing_flashes).to eq(
        'error' => 'swag',
        'alert' => 'swag',
        'notice' => 'swag',
        'success' => 'swag')
    end
  end
end
