module Admin
  class SkateparksController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # simply overwrite any of the RESTful actions. For example:
    #
    # def index
    #   super
    #   @resources = Skatepark.all.paginate(10, params[:page])
    # end

    # Define a custom finder by overriding the `find_resource` method:
    # def find_resource(param)
    #   Skatepark.find_by!(slug: param)
    # end

    # See https://administrate-docs.herokuapp.com/customizing_controller_actions
    # for more information

    def new
      skatepark = Skatepark.new
      skatepark.build_location
      render locals: {
        page: Administrate::Page::Form.new(dashboard, skatepark)
      }
    end

    private

      def resource_params
        params.require(:skatepark).permit(
          :skatepark_image_ids,
          :name,
          :rating,
          :material,
          :designer,
          :builder,
          :opened,
          :hours,
          :size,
          :notes,
          :info,
          :helmet,
          :lights,
          :photo_cred,
          :photo_url,
          :video_url,
          :obstacles,
          location_attributes: Skatepark::LOCATION_ATTRIBUTES,
        )
      end
  end
end
