class SkateparksController < ApplicationController

  def search
    if params[:search]
      @skateparks = Skatepark.search(params[:search].downcase)

      respond_to do |format|
        format.json {render json: {partial: render_to_string('_search.html.erb', layout: false)} }
      end
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
    @skatepark = Skatepark.find(params[:id])
  end


  def show
    @skatepark = Skatepark.find(params[:id])
    @last = Skatepark.last.id
    @lat_long = @skatepark.get_lat_long # this guy is gonna die
    @state_skateparks = Skatepark.where(state: @skatepark.state)
  end



  def update # needs to be changed to AJAX
    @skatepark = Skatepark.find(params[:id])
    if @skatepark.update(skatepark_params)
      redirect_to @skatepark
    else
      render 'edit'
    end
  end

# admin delete skatepark via AJAX
  def destroy
    @skatepark = Skatepark.find(params[:id])
    @skatepark.destroy
    respond_to do |format|
      format.js
    end
  end

  # skateparks by state via AJAX
  def state
    @skateparks = Skatepark.where(state: params[:state]).order("city ASC")
    @skatepark = Skatepark.find(100)
    @lat_long = @skatepark.get_lat_long
    @testers = [[33.707255, -117.800631], [34.10446, -117.934803], [33.071545, -116.59284]]
    respond_to do |format|
      format.json {render json: {partial: render_to_string('_state.html.erb', layout: false)} }
    end
  end

  private
  def skatepark_params
    params.require(:skatepark).permit(:name, :city, :state, :rating, :designer, :builder, :opened, :address, :hours, :size, :notes, :helmet)
  end


end
