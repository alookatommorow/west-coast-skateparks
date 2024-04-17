class UserSerializer < Serialization::BaseSerializer
  attributes :id, :username, :name, :email, :created_at, :avatar

  def avatar(user = serializeable)
    user.avatar&.url
  end

  def created_at(user = serializeable)
    user.created_at.strftime('%Y')
  end
end
