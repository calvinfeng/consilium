const RegressionApiUtil = require('../util/regression_api_util');
const RegressionConstants = require('../constants/regression_constants');
const Dispatcher = require('../dispatcher/dispatcher');

/*
Submit data in this format
{
x:[1,2,3,4,5],
y:[1,2,3,4,5]
}
*/
const LinearRegressionActions = {
  // Client Actions
  computeRegression: function(data) {
    RegressionApiUtil.computeRegression(data,
      LinearRegressionActions.receiveComputedResults,
      LinearRegressionActions.handleError
    );
  },

  // Server Actions
  receiveComputedResults: function(computationResult) {
    Dispatcher.dispatch({
      actionType: RegressionConstants.RECEIVE_COMPUTATION,
      computationResult: computationResult
    });
  },

  handleError: function(response) {
    Dispatcher.dispatch({
      actionType: RegressionConstants.COMPUTATION_ERROR,
      errors: response.error()
    });
  }
};

module.exports = LinearRegressionActions;
