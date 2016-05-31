class VisitsController < ApplicationController
  def create
    if logged_in?
      @visit = Visit.create(
        skatepark_id: params[:skatepark_id],
        user_id: current_user.id,
      )
      render_visit_button
    else
      render nothing: true
    end
  end

  def destroy
    Visit.destroy(params[:id])
    render_visit_button
  end

  private

    def render_visit_button
      render partial: "button", locals: {
        visit: @visit,
        user: current_user.id,
        skatepark: Skatepark.find(params[:skatepark_id]),
      }
    end
end
