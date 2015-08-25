class SessionsController < ApplicationController

  def new

  end

  def create
    login
  end

  def destroy
    logout
    redirect_to root_path
  end
end
