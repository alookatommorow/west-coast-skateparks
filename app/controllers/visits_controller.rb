class VisitsController < ApplicationController
  def create
    ManyToMany.create(Visit, params)
    render nothing: true
  end

  def destroy
    ManyToMany.destroy(Visit, params)
    render nothing: true
  end
end
