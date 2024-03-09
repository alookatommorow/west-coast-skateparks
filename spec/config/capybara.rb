require 'capybara/rspec'

Capybara.enable_aria_label = true

is_ci = ENV.fetch('CI', false)

# Capybara.register_driver :ci_chrome do |app|
#   options = Selenium::WebDriver::Chrome::Options.new(
#     args: %w[headless no-sandbox disable-gpu disable-dev-shm-usage],
#     binary: '/usr/bin/google-chrome'
#   )

#   Capybara::Selenium::Driver.new(
#     app,
#     browser: :chrome,
#     options:
#   )
# end

RSpec.configure do |config|
  config.after(:suite) do
    FileUtils.rm_rf(Dir["#{Rails.root}/spec/test_files/"])
  end

  # if is_ci
  #   config.before(:each, type: :system) do
  #     driven_by :selenium, using: :headless_chrome
  #   end
  # else
  # tests use regular (faster) driver if they don't require js
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by :selenium, using: :headless_chrome
  end
  # end
end
