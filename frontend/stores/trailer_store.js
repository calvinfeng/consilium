const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const TrailerStore = new Store(Dispatcher);

let _trailers = [];
let _idx = 0;

TrailerStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MovieConstants.TRAILERS_RECEIVED:
    TrailerStore.addTrailers(payload.videoSrcs);
    TrailerStore.__emitChange();
    break;
  }
};

TrailerStore.addTrailers = function(srcs) {
  _trailers = _trailers.concat(srcs);
};

TrailerStore.clearTrailers = function() {
  _trailers = [];
};

TrailerStore.getTrailerByIncrement = function() {
  if (_idx >= _trailers.length) {
    _idx = 0;
  }
  //Using round-robin technique to serve trailers
  let currentTrailer = _trailers[_idx];
  _idx += 1;
  return currentTrailer;
};

module.exports = TrailerStore;
