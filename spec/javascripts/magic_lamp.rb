MagicLamp.register_fixture(controller: SkateparksController) do
  @skatepark = Skatepark.find(299)
  render 'skateparks/show'
end

MagicLamp.register_fixture(controller: SkateparksController) do
  render 'skateparks/index'
end