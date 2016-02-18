class OpinionsController < ApplicationController
  def rate
    create_opinion(:rating)
  end

  def review
    create_opinion(:review)
  end

  private

    attr_reader :type

    def create_opinion(type)
      @type = type
      if opinion
        opinion.update(type => params[type])
      else
        opinion_class.create(params_for(type))
      end
      redirect_to skatepark_path(params[:id])
    end

    def opinion_class
      type == :review ? Review : Rating
    end

    def opinion
      opinion_class.find_by(id_params)
    end

    def params_for(type)
      id_params.merge(type => params[type])
    end

    def id_params
      { user_id: params[:user_id],
        skatepark_id: params[:id] }
    end
end
