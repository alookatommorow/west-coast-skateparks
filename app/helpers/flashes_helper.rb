module FlashesHelper
  def user_facing_flashes
    flash.to_hash.slice('alert', 'error', 'notice', 'success')
  end

  def flash_class_name(type)
    message_styles[type]
  end

  private

    def message_styles
      { 'error' => 'error', 'success' => 'positive', 'notice' => 'info' }
    end
end
