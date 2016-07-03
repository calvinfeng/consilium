
const EmotionApiUtil = {
  fetchEmotions: function(blobData, successCb) {
    $.ajax({
      url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
      beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", window.microsoftSubscriptionKey);
      },
      type: "POST",
      processData: false,
      data: blobData,
      success: successCb,
      error: function(response) {
        console.log(response);
      }
    });
  }
};

module.exports = EmotionApiUtil;
