module ApplicationHelper
  def non_header_page?
    current_page?(root_path) ||
      current_page?(new_session_path) ||
      current_page?(new_user_path)
  end
end
