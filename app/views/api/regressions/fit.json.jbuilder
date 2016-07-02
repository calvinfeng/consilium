json.fitted_data do
  json.array! @fitted_data do |datum|
    json.x datum[0]
    json.y datum[1]
  end
end

json.parameters do
  json.array! @parameters do |param|
    json.param param
  end
end

json.normalized_data do
  json.array! @normalized_data do |datum|
    json.x datum[0]
    json.y datum[1]
  end
end
