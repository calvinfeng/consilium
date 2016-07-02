require './lib/linear_regression.rb'
require 'byebug'
class Api::RegressionsController < ApplicationController

  def linear_regression
    x = params[:data][:x].map { |el| el.to_f }
    y = params[:data][:y].map { |el| el.to_f }
    regression_model = LinearRegression.new(x,y)
    regression_model.gradient_descent(0.01)
    @parameters = regression_model.get_fitted_params
    @fitted_data = regression_model.fit
    render "api/regressions/fit.json.jbuilder"
  end

end
