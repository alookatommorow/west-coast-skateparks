module Buttercms
  class PostsController < Buttercms::BaseController
    def index
      @posts = ButterCMS::Post.all(page: params[:page], page_size: 10)
      @sorted_posts = @posts.sort_by { |post| post.published }.reverse
      @next_page = @posts.meta.next_page
      @previous_page = @posts.meta.previous_page
    end

    def show
      @post = ButterCMS::Post.find(params[:slug])

      @next_post = @post.meta.next_post
      @previous_post = @post.meta.previous_post
    end
  end
end
