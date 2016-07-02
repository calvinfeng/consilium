const React = require('react');
const Loader = require('react-loader');
const RegressionStore = require('../stores/regression_store');

/* global Plotly */
const RegressionDisplay = React.createClass({

  getInitialState: function() {
    return {loaded: false};
  },

  componentDidMount: function() {
    this.regressionStoreListener = RegressionStore.addListener(this.__onChange);
  },

  componentWillUnmount: function() {
    this.regressionStoreListener.remove();
  },

  __onChange: function() {
    this.setState({loaded: true});
    let fitData = RegressionStore.fitData();
    let normData = RegressionStore.normData();
    let xFit = [], yFit = [], xNorm =[], yNorm = [];

    for (let i = 0; i < fitData.length; i++) {
      xFit.push(fitData[i].x);
      yFit.push(fitData[i].y);
      xNorm.push(normData[i].x);
      yNorm.push(normData[i].y);
    }
    let line = {
      name: "Fitted Line",
      x: xFit,
      y: yFit,
      mode: 'line'
    };

    let scatter = {
      name: 'Normalized Data',
      x: xNorm,
      y: yNorm,
      mode: 'markers'
    };

    let layout = {
      title: 'Linear Regression',
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
        title: 'normalized time'
      },
      yaxis: {
        title: 'normalized $'
      }
    };

    Plotly.newPlot('regression-plot',[scatter, line], layout);
  },

  render: function() {
    return (
      <Loader className="spinner" loadedClassName="loadedContent" loaded={this.state.loaded}>
        <div id="regression-plot"></div>
      </Loader>
    );
  }

});


module.exports = RegressionDisplay;
