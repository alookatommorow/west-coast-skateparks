class User < ActiveRecord::Base
  has_secure_password
  has_many :user_skateparks
  has_many :skateparks, through: :user_skateparks
end
