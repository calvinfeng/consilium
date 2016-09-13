require 'matrix'
class MultivariateRegression
  attr_reader :x_matrix, :y_vector
  # x_t is a collectin of vector as such
  # [[x_1, x_2, x_3, x_4, ...], [x_1, x_2, x_3, ...], ...]
  def initialize(x_t, y_t)
    @m = x_t.length
    @x_matrix = Matrix.rows(x_t.map {|row| row.unshift(1)})
    @y_vector = Matrix.column_vector(y_t)
  end

  def get_params
    raise "Training set x,y array sizes are not equal" unless @m == @y_vector.to_a.length
    (@x_matrix.transpose * @x_matrix).inv * @x_matrix.transpose * @y_vector
  end

  # Don't need any normalization
  def get_data(dimensions)
    data = []
    (0...@m).each do |row_idx|
      row = []
      col_idx = 1
      while col_idx <= dimensions
        row << @x_matrix[row_idx, col_idx]
        col_idx += 1
      end
      row << @y_vector[row_idx, 0]
      data << row
    end
    data
  end

  def get_fit(dimensions)
    data = []
    hypo_y_vector = @x_matrix * self.get_params
    (0...@m).each do |row_idx|
      row = []
      col_idx = 1
      while col_idx <= dimensions
        row << @x_matrix[row_idx, col_idx]
        col_idx += 1
      end
      row << hypo_y_vector[row_idx, 0]
      data << row
    end
    data
  end
end
