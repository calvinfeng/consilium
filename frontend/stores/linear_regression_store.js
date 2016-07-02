const Store = require('flux/utils').Store;
const hashHistory = require('react-router').hashHistory;
const Dispatcher = require('../dispatcher/dispatcher');

const RegressionConstants = require('../constants/regression_constants');
const LinearRegressionStore = new Store(Dispatcher);

var _parameters = {};
var _errors;

LinearRegressionStore.__onDispatch = function(payload) {
  console.log("LinearRegressionStore is listening!");
  switch(payload.actionType) {
    case RegressionConstants.RECEIVE_COMPUTATION:
      LinearRegressionStore.setData(payload);
      LinearRegressionStore.__emitChange();
    break;

    case RegressionConstants.COMPUTATION_ERROR:
      LinearRegressionStore.setErrors(payload.errors);
      LinearRegressionStore.__emitChange();
    break;
  }
};

LinearRegressionStore.setData = function(result) {
  console.log(result);
};

LinearRegressionStore.setErrors = function(errors) {
  _errors = errors;
};

LinearRegressionStore.inventory = function() {
  return _parameters.slice();
};

module.exports = LinearRegressionStore;
