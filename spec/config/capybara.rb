require 'capybara/rspec'

Capybara.enable_aria_label = true

is_ci = ENV.fetch('CI', false)

RSpec.configure do |config|
  config.after(:suite) do
    FileUtils.rm_rf(Dir["#{Rails.root}/spec/test_files/"])
  end

  # tests use regular (faster) driver if they don't require js
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    if is_ci
      driven_by(
        :selenium,
        using: :remote,
        options: { url: 'http://localhost:4444/wd/hub', capabilities: :chrome }
      ) do |options|
        options.add_argument('no-sandbox')
        options.add_argument('--headless')
      end
    else
      driven_by :selenium, using: :headless_chrome
    end
  end
end
