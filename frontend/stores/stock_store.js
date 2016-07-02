const StockConstants = require('../constants/stock_constants');
var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var StockStore = new Store(Dispatcher);

var _stocks = [];
var _errors = [];

StockStore.__onDispatch = function(payload) {

  switch(payload.actionType) {
    case StockConstants.RECEIVE:
      StockStore.setStocks(payload.stockData.dataset_data.data);
      StockStore.__emitChange();
    break;

    case StockConstants.ERROR:
      StockStore.setErrors(payload.errors);
      StockStore.__emitChange();
    break;

  }
};

StockStore.setStocks = function(stocks) {
  _stocks = stocks;
};

StockStore.setErrors = function(errors) {
  _errors = errors;
};

StockStore.inventory = function() {
  return _stocks.slice();
};

module.exports = StockStore;
