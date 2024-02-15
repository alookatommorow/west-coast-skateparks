module Buttercms
  class CategoriesController < Buttercms::BaseController
    def show
      @category = ButterCMS::Category.find(params[:slug], include: :recent_posts)
    end
  end
end
