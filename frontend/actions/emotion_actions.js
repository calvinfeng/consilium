const EmotionApiUtil = require('../util/emotion_api_util');
const EmotionConstants = require('../constants/emotion_constants');
const Dispatcher = require('../dispatcher/dispatcher');

const EmotionActions = {
  //Client Actions
  fetchEmotions: function(blob) {
    EmotionApiUtil.fetchEmotions(blob, this.receiveEmotions);
  },

  //Server actions
  receiveEmotions: function(apiData) {
    let emotionScores = apiData[0].scores;
    Dispatcher.dispatch({
      actionType: EmotionConstants.RECEIVE_EMOTION,
      emotionScores: emotionScores
    });
  }
};

module.exports = EmotionActions;
