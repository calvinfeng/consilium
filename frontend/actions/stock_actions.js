const Dispatcher = require('../dispatcher/dispatcher');
const StockStore = require('../stores/stock_store');
const QuandlApiUtil = require('../util/quandl_api_util');
const StockConstants = require('../constants/stock_constants');

const StockActions = {
  // Client Actions
  fetchStockPrices: function() {
    QuandlApiUtil.fetchStockPrices("AAPL",
      StockActions.receiveStockPrices,
      StockActions.handleError
    );
  },

  // Server Actions
  receiveStockPrices: function(stockData) {
    Dispatcher.dispatch({
      actionType: StockConstants.RECEIVE,
      stockData: stockData
    });
  },

  handleError: function(response) {
    Dispatcher.dispatch({
      actionType: StockConstants.ERROR,
      errors: response.error()
    });
  }

};

module.exports = StockActions;
