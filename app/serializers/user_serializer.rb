class UserSerializer < Serialization::BaseSerializer
  attributes :id, :username, :name, :email, :created_at, :avatar

  def avatar
    record.avatar&.url
  end

  def created_at
    record.created_at.strftime('%Y')
  end
end
