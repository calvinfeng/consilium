const React = require('react');
const Loader = require('react-loader');
const StockActions = require('../actions/stock_actions');
const StockStore = require('../stores/stock_store');
const LinearRegressionActions = require('../actions/linear_regression_actions');
const RegressionDisplay = require('./regression_display');
/* global Plotly */
const Graph = React.createClass({

  getInitialState: function() {
    return {loaded: false};
  },

  componentWillMount: function() {
    StockActions.fetchStockPrices();
  },

  componentDidMount: function() {
    this.stockStoreListener = StockStore.addListener(this.__onChange);
  },

  componentWillUnmount: function() {
    this.stockStoreListener.remove();
  },

  __onChange: function() {
    let stockData = StockStore.inventory();
    let stockPrice = [];
    let timeline = [];
    for (let i = 0; i < stockData.length; i++) {
      timeline.push(Date.parse(stockData[i][0])/(86400*1000));
      stockPrice.push(stockData[i][1]);
    }
    this.setState({loaded: true});
    this.plot(timeline, stockPrice);
    LinearRegressionActions.computeRegression({x: timeline, y: stockPrice});
  },

  plot: function(xArr, yArr) {
    var scatter = {
      name: 'Data Points',
      x: xArr,
      y: yArr,
      mode: 'markers'
    };

    var layout = {
      title: 'FB Stock Prices',
      autosize: false,
      width: window.innerWidth,
      height: window.innerHeight*0.80,
      margin: {
        l: 200,
        r: 200,
        b: 50,
        t: 50
      },
      xaxis: {
        title: 'Days Since Unix Epoch'
      },
      yaxis: {
        title: '$ Dollars'
      }
    };
    Plotly.newPlot('data-plot',[scatter], layout);
  },

  render: function() {
    return (
      <div>
        <Loader className="spinner" loadedClassName="loadedContent" loaded={this.state.loaded}>
          <div id="data-plot"></div>
        </Loader>
        <RegressionDisplay/>
      </div>
    );
  }

});

module.exports = Graph;
