class SkateparkImageSerializer < Serialization::BaseSerializer
  attributes :url

  def url(skatepark_image = serializeable)
    skatepark_image.photo
  end
end
