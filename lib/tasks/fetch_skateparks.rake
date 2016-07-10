# include ActionView::Helpers::ControllerHelper


namespace :skateparks do
  desc 'Fetch fresh skateparks.json and save the bitch'

  task :fetch_skateparks do
    # rails_session = ActionDispatch::Integration::Session.new(Rails.application)
    # rails_session.get("/skateparks/5")
    # api_controller = Api::SkateparksController.new
    # p api_contoller.index
    app = ActionDispatch::Integration::Session.new(Rails.application)
    app.get "/package"
    # api_json_get

    # File.open("public/skateparks.json", "w+") do |f|
    #   puts f.read
    #   f.close
    # end
  end
end

