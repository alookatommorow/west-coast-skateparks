class VisitsController < ApplicationController
  def create
    Visit.create(visit_params)
    render nothing: true
  end

  def update
    visit = Visit.find_by(visit_params)
    Visit.destroy(visit.id) if visit
    render nothing: true
  end

  private

    def visit_params
      { user_id: params[:user_id],
      skatepark_id: params[:skatepark_id] }
    end
end
