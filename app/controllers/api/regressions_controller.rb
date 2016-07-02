require './lib/linear_regression.rb'
require 'byebug'
class Api::RegressionsController < ApplicationController

  def linear_regression
    x = params[:data][:x].map { |el| el.to_f }
    y = params[:data][:y].map { |el| el.to_f }
    regression_model = LinearRegression.new(x,y)
    regression_model.gradient_descent(1.0)
    @fitted_data = regression_model.get_fit
    @parameters = regression_model.get_params
    @normalized_data = regression_model.get_norm_data
    render "api/regressions/fit.json.jbuilder"
  end

end
