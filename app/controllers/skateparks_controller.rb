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
  end

  def index
  end

  private
  def skatepark_params
    params.require(:skatepark).permit(:name, :city, :state, :rating, :designer, :builder, :opened, :address, :hours, :size, :notes, :helmet)
  end
end
