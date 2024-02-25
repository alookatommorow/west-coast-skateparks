module Api
  class BaseController < ApplicationController
    include ApiErrorHandler
  end
end
