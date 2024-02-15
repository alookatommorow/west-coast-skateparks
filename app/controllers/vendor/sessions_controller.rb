module Vendor
  class SessionsController < ApplicationController
    def create
      vendor_auth
    end

    private

    def vendor_auth
      if params[:email].blank?
        flash.now[:error] = 'No email detected, please create an account or add email to your Facebook'
        render partial: 'flashes'
      else
        user = User.find_by_email(params[:email])
        user = User.create(vendor_auth_params) if user.nil?
        session[:id] = user.id
        render json: user.id
      end
    end

    def login_user; end

    def vendor_auth_params
      {
        name: params[:name],
        email: params[:email],
        username: params[:email],
        avatar:,
        password: SecureRandom.hex(20)
      }
    end

    def avatar
      URI.parse(params[:avatar]) if params[:avatar].present?
    end
  end
end
