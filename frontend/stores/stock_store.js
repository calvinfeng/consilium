const Store = require('flux/utils').Store;
const hashHistory = require('react-router').hashHistory;
const Dispatcher = require('../dispatcher/dispatcher');

const StockConstants = require('../constants/stock_constants');
const StockStore = new Store(Dispatcher);

var _stocks, _errors;

StockStore.__onDispatch = function(payload) {
  console.log("StockStore is listening!");
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
