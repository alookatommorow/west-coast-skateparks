class Association
  def initialize(class_name, params)
    @class_name = class_name
    @params = params
    create_association
  end

  private

    attr_reader :class_name, :params

    def create_association
      if association
        association.update(type => params[type])
      else
        class_name.create(params_for_type)
      end
    end

    def type
      class_name.name.underscore.to_sym
    end

    def association
      class_name.find_by(id_params)
    end

    def params_for_type
      id_params.tap do |this|
        this.merge(type => params[type]) if type
      end
    end

    def id_params
      { user_id: params[:user_id],
        skatepark_id: params[:skatepark_id] }
    end
end
