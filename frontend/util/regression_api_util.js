const RegressionApiUtil = {
  computeRegression: function(inputData, successCb, errorCb) {
    $.ajax({
      url: `api/regressions`,
      dataType: "JSON",
      data: {data: inputData},
      method: "GET",
      success: successCb,
      error: errorCb
    });
  }
};

module.exports = RegressionApiUtil;
