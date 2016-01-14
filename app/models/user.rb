class User < ActiveRecord::Base
  has_secure_password
  validates :username, :password, :email, presence: true
  validates :username, :email, uniqueness: true
  validates_format_of :email, with: /.+@.+\..{2,}/
  # has_many :user_skateparks
  # has_many :skateparks, through: :user_skateparks
  has_many :favorites
  has_many :favorite_parks, through: :favorites
  validates_associated :favorites
end
