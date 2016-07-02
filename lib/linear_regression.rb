class LinearRegression
  # Hypothesis - Linear - h(x) = p0 + p1 x

  def initialize(x_t, y_t)
    @m = x_t.length
    @x_t = x_t
    @y_t = y_t
  end

  # Deriviative of cost function J with respect to p0
  def dj_dp0(p0, p1)
    raise "Training set x,y array sizes are not equal" if @x_t.length != @y_t.length
    sum = 0
    for i in 0...@m
      sum += (p0 + p1*@x_t[i] - @y_t[i])
    end
    sum/@m
  end

  # Derivative of cost function J with respect to p1
  def dj_dp1(p0, p1)
    raise "Training set x,y array sizes are not equal" if @x_t.length != @y_t.length
    sum = 0
    for i in 0...@m
      sum += (p0 + p1*@x_t[i] - @y_t[i])*@x_t[i]
    end
    sum/@m
  end

  def gradient_descent(step_size)
    p0 = 0
    p1 = 0
    dj_dp = [dj_dp0(p0, p1), dj_dp1(p0, p1)]
    while norm(dj_dp) > 0.000000000000001
      dj_dp = [dj_dp0(p0, p1), dj_dp1(p0, p1)]
      temp0 = p0 - (step_size * dj_dp[0])
      temp1 = p1 - (step_size * dj_dp[1])
      p0 = temp0
      p1 = temp1
    end
    @p0, @p1 = p0, p1
  end

  def get_fitted_params
    [@p0, @p1]
  end

  def fit
    fitted_data = []
    for i in 0...@m
      fitted_data << [@x_t[i], @x_t[i]*@p1 + @p0]
    end
    fitted_data
  end

  def norm(vector)
    vector[0]**2 + vector[1]**2
  end
end
