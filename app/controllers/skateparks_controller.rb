class SkateparksController < ApplicationController
  def new
    @skatepark = Skatepark.new
  end

  def create
    @skatepark = Skatepark.new(skatepark_params)
    if @skatepark.save
      redirect_to @skatepark
    else
      render 'new'
    end
  end

  def edit
    @skatepark = Skatepark.find(params[:id])
  end

  def show
    @skatepark = Skatepark.find(params[:id])
  end

  def update
    @skatepark = Skatepark.find(params[:id])
    if @skatepark.update(skatepark_params)
      redirect_to @skatepark
    else
      render 'edit'
    end
  end

  def destroy
    @skatepark = Skatepark.find(params[:id])
    if @skatepark.destroy
      p '*' *100
      redirect_to root_path
    else
      redirect_to @skatepark
    end
    # respond_to do |format|
    #   format.json {render json: @skatepark }
    # end

  end

  def index

  end

  def state
    @skateparks = Skatepark.where(state: params[:state])
    respond_to do |format|
      format.json {render json: {partial: render_to_string('_state.html.erb', layout: false)} }
    end

  end

  def add_favorite
    p "**hello**"*100
    favorite(params[:user_id], params[:id])
    redirect_to root_path
  end

  private
  def skatepark_params
    params.require(:skatepark).permit(:name, :city, :state, :rating, :designer, :builder, :opened, :address, :hours, :size, :notes, :helmet)
  end
end
