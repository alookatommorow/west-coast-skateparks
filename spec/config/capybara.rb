require 'capybara/rspec'

Capybara.enable_aria_label = true

RSpec.configure do |config|
  # tests use regular (faster) driver if they don't require js
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by :selenium, using: :headless_chrome
  end
end
