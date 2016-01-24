class SkateparksController < ApplicationController
  before_action :set_skatepark, only: [:edit, :show, :update, :destroy]

  def search
    if params[:search]
      skateparks = Skatepark.search(params[:search].downcase)
      render partial: 'search', locals: {skateparks: skateparks}
    end
  end

  def new
    @skatepark = Skatepark.new
  end

  def create
    @skatepark = Skatepark.new(skatepark_params)
    if @skatepark.save
      respond_to do |format|
        format.js
      end
    else
      render 'new'
    end
  end

  def edit
  end

  def show
    @last = Skatepark.last.id
    @state_skateparks = Skatepark.where(state: @skatepark.state)
  end

  # needs to be changed to AJAX
  def update
    if @skatepark.update(skatepark_params)
      redirect_to @skatepark
    else
      render 'edit'
    end
  end

  # admin delete skatepark via AJAX
  def destroy
    @skatepark.destroy
    respond_to do |format|
      format.js
    end
  end

  # skateparks by state via AJAX
  def state
    skateparks = Skatepark.where(state: params[:state]).order("city ASC")
    render partial: 'state', locals: {skateparks: skateparks}
  end

  private

  def set_skatepark
    @skatepark = Skatepark.find(params[:id])
  end

  def skatepark_params
    params.require(:skatepark).permit(:name, :city, :state, :rating, :designer, :builder, :opened, :address, :hours, :size, :notes, :helmet)
  end


end
