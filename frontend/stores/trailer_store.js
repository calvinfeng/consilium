const Dispatcher = require('../dispatcher/dispatcher');
const MovieConstants = require('../constants/movie_constants');
const Store = require('flux/utils').Store;
const TrailerStore = new Store(Dispatcher);

let _trailers = {};
let _idx = 0;

TrailerStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MovieConstants.TRAILERS_RECEIVED:
    TrailerStore.addTrailers(payload.imdbId, payload.videoSrcs);
    TrailerStore.__emitChange();
    break;
  }
};

TrailerStore.addTrailers = function(imdbId, srcs) {
  _trailers[imdbId] = srcs;
};

TrailerStore.getRandomTrailer = function(imdbIds) {
  let randomId = imdbIds[Math.floor(Math.random()*imdbIds.length)];
  while (_trailers[randomId] === undefined) {
    randomId = imdbIds[Math.floor(Math.random()*imdbIds.length)];
  }
  let srcs = _trailers[randomId];
  return srcs[Math.floor(Math.random()*srcs.length)];
};

module.exports = TrailerStore;
