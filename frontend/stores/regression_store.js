const RegressionConstants = require('../constants/regression_constants');
var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var RegressionStore = new Store(Dispatcher);

var _parameters, _normData, _fitData, _errors;

RegressionStore.__onDispatch = function(payload) {

  switch(payload.actionType) {

    case RegressionConstants.RECEIVE_COMPUTATION:
      RegressionStore.setData(payload.computationResult);
      RegressionStore.__emitChange();
    break;

    case RegressionConstants.COMPUTATION_ERROR:
      RegressionStore.setErrors(payload.errors);
      RegressionStore.__emitChange();
    break;

  }
};

RegressionStore.setData = function(computationResult) {
  _fitData = computationResult.fitted_data;
  _normData = computationResult.normalized_data;
  _parameters = computationResult.parameters;

};

RegressionStore.setErrors = function(errors) {
  _errors = errors;
};

RegressionStore.fitData = function() {
  return _fitData.slice();
};

RegressionStore.normData = function() {
  return _normData.slice();
};

module.exports = RegressionStore;
