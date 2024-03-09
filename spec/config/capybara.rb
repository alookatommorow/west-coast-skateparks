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
      driven_by :selenium,
                using: :chrome,
                screen_size: [1400, 1400],
                options: { browser: :remote,
                           url: 'http://chrome-server:4444' } do |driver_option|
        driver_option.add_argument 'disable-dev-shm-usage'
      end
    else
      driven_by :selenium, using: :headless_chrome
    end
  end
end
