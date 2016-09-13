class LinearRegression
  # Hypothesis - Linear - h(x) = p0 + p1 x

  def initialize(x_t, y_t)
    @m = x_t.length
    @x_t = x_t
    @y_t = y_t
    @norm_x_t = normalize(x_t)
    @norm_y_t = normalize(y_t)
  end

  # Deriviative of cost function J with respect to p0
  def dj_dp0(p0, p1)
    raise "Training set x,y array sizes are not equal" if @x_t.length != @y_t.length
    sum = 0.0
    for i in 0...@m
      sum += (p0 + p1*@norm_x_t[i] - @norm_y_t[i])
    end
    sum/@m
  end

  # Derivative of cost function J with respect to p1
  def dj_dp1(p0, p1)
    raise "Training set x,y array sizes are not equal" if @x_t.length != @y_t.length
    sum = 0.0
    for i in 0...@m
      sum += @norm_x_t[i]*(p0 + p1*@norm_x_t[i] - @norm_y_t[i])
    end
    sum/@m
  end

  def gradient_descent(learning_rate)
    # It seems to me that normalizing learning_rate doesn't help
    # The training set needs to be normalized
    normalized_learning_rate = learning_rate/1
    p0 = 0
    p1 = 0
    dj_dp = [dj_dp0(p0, p1), dj_dp1(p0, p1)]
    while norm(dj_dp) > 0.000000001
      dj_dp = [dj_dp0(p0, p1), dj_dp1(p0, p1)]
      temp0 = p0 - (normalized_learning_rate * dj_dp[0])
      temp1 = p1 - (normalized_learning_rate * dj_dp[1])
      p0 = temp0
      p1 = temp1
    end
    @p0, @p1 = p0, p1
  end

  def get_params
    [@p0, @p1]
  end

  def get_norm_data
    norm_data = []
    for i in 0...@m
      norm_data << [@norm_x_t[i], @norm_y_t[i]]
    end
    norm_data
  end

  def get_fit
    fitted_data = []
    for i in 0...@m
      fitted_data << [@norm_x_t[i], @norm_x_t[i]*@p1 + @p0]
    end
    fitted_data
  end

  def norm(vector)
    vector[0]**2 + vector[1]**2
  end

  def normalize(vector)
    max = vector.max
    min = vector.min
    vector.map do |el|
      (el - min)/(max - min)
    end
  end

end
