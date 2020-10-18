module Admin
  class SkateparksController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # simply overwrite any of the RESTful actions. For example:
    #
    def create
      binding.pry
    end

    # Define a custom finder by overriding the `find_resource` method:
    # def find_resource(param)
    #   Skatepark.find_by!(slug: param)
    # end

    # See https://administrate-docs.herokuapp.com/customizing_controller_actions
    # for more information

    def new
      skatepark = Skatepark.new
      render locals: {
        page: Administrate::Page::Form.new(dashboard, skatepark)
      }
    end

    private

    def resource_params
      params.require(:skatepark).permit(
        :skatepark_image_ids,
        :city,
        :state,
        :address,
        :latitude,
        :longitude,
        :name,
        :rating,
        :material,
        :designer,
        :builder,
        :opened,
        :hours,
        :size,
        :hero,
        :map_photo,
        :notes,
        :info,
        :helmet,
        :lights,
        :photo_cred,
        :photo_url,
        :video_url,
        obstacles: [],
      )
    end

    def read_param_value(data)
      # if data.is_a?(ActionController::Parameters) && data[:type]
      #   if data[:type] == Administrate::Field::Polymorphic.to_s
      #     GlobalID::Locator.locate(data[:value])
      #   else
      #     raise "Unrecognised param data: #{data.inspect}"
      #   end
      # elsif data.is_a?(ActionController::Parameters)
      #   data.transform_values { |v| read_param_value(v) }
      # else
      #   data
      # end
    end
  end
end
