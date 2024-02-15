# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  admin               :boolean          default(FALSE)
#  avatar_content_type :string
#  avatar_file_name    :string
#  avatar_file_size    :bigint
#  avatar_updated_at   :datetime
#  email               :string
#  name                :string
#  password_digest     :string
#  username            :string
#  created_at          :datetime
#  updated_at          :datetime
#
# Indexes
#
#  index_users_on_email  (email)
#
class User < ActiveRecord::Base
  has_secure_password
  validates :username, :email, presence: true
  validates :password, presence: true, on: :create
  validates :username, :email, uniqueness: true
  validates_format_of :email, with: /\A.+@.+\..{2,}\z/

  has_many :ratings, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_and_belongs_to_many :favorites,
                          join_table: 'favorites',
                          class_name: 'Skatepark',
                          dependent: :destroy
  has_and_belongs_to_many :visits,
                          join_table: 'visits',
                          class_name: 'Skatepark',
                          dependent: :destroy

  has_attached_file(:avatar, styles: { thumb: '100x100>' },
                             default_url: 'https://33.media.tumblr.com/avatar_ee7f0ba1cb58_128.png')
  validates_attachment_content_type :avatar, content_type: /\Aimage/

  def favorited?(skatepark_id)
    favorites.exists?(skatepark_id)
  end

  def visited?(skatepark_id)
    visits.exists?(skatepark_id)
  end

  def to_s
    name || username
  end
end
