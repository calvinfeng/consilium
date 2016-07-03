const EmotionConstants = require('../constants/emotion_constants');
const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const EmotionStore = new Store(Dispatcher);

var _primaryEmotion;

const greetings = {
  anger: "I can sense anger, DIUUUUUUU",
  contempt: "Contempt is no good",
  disgust: "You look disgusted by me, oh well whatever...",
  fear: "Are you scared of me? You should be.",
  happiness: "You look happy",
  neutral: "I can't tell cause you look indifferent, maybe try to smile?",
  sadness: "I see sadness in your eyes",
  surprise: "Surprised by my intelligence?"
};

EmotionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case EmotionConstants.RECEIVE_EMOTION:
      EmotionStore.setPrimaryEmotion(payload.emotionScores);
      EmotionStore.__emitChange();
    break;

    case EmotionConstants.EMOTION_ERROR:
      EmotionStore.setErrors(payload.errors);
      EmotionStore.__emitChange();
    break;
  }
};

EmotionStore.setPrimaryEmotion = function(emotionScores){
  let primaryEmotion;
  Object.keys(emotionScores).forEach(function(emotion){
    if (primaryEmotion) {
      if (emotionScores[emotion] > emotionScores[primaryEmotion]) {
        primaryEmotion = emotion;
      }
    } else {
      primaryEmotion = emotion;
    }
  });
  _primaryEmotion = primaryEmotion;
};

EmotionStore.getGreeting = function() {
  return greetings[_primaryEmotion];
};

module.exports = EmotionStore;
