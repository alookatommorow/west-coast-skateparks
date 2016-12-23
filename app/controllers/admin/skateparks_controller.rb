module Admin
  class SkateparksController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # simply overwrite any of the RESTful actions. For example:
    #
    # def index
    #   super
    #   @resources = Skatepark.all.paginate(10, params[:page])
    # end
    def new
      @skatepark = Skatepark.new
      @skatepark.build_location
      render "admin/skateparks/new"
    end

    def create
      @skatepark = Skatepark.create(params[:skatepark].permit!)
      if @skatepark.save
        redirect_to admin_skatepark_path(@skatepark), notice: "Skatepark has been created."
      else
        flash.now[:notice] = @skatepark.errors.full_messages.to_sentence
        render "admin/skateparks/new"
      end
    end

    # Define a custom finder by overriding the `find_resource` method:
    # def find_resource(param)
    #   Skatepark.find_by!(slug: param)
    # end

    # See https://administrate-docs.herokuapp.com/customizing_controller_actions
    # for more information
  end
end
