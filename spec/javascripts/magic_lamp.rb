MagicLamp.register_fixture do
  @skatepark = Skatepark.find(299)
  render 'welcome/index'
end