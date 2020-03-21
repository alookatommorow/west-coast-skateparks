module ApplicationHelper
  def non_header_page?
    current_page?(root_path) ||
      current_page?(new_session_path) ||
      current_page?(new_user_path) ||
      @skatepark
  end

  def fetch_gmaps?
    controller.action_name == "show" && ["skateparks", "users"].include?(controller.controller_name)
  end
end
