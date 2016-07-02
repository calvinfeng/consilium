json.array! @fitted_data do |datum|
  json.x datum[0]
  json.y datum[1]
end

json.array! @parameters do |param|
  json.param param
end
