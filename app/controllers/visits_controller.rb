class VisitsController < ApplicationController
  def create
    ManyToMany.create(Visit, params)
    render nothing: true
  end

  def update
    ManyToMany.destroy(Visit, params)
    render nothing: true
  end
end
