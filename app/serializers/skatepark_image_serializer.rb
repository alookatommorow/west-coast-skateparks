class SkateparkImageSerializer < Serialization::BaseSerializer
  attributes :url

  def url
    record.photo
  end
end
