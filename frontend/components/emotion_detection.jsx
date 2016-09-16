const React = require('react');
const Loader = require('react-loader');
const hashHistory = require('react-router').hashHistory;
const EmotionActions = require('../actions/emotion_actions');
const EmotionStore = require('../stores/emotion_store');

const EmotionDetection = React.createClass({

  getInitialState: function() {
    let welcomeText = "Take a picture and the computer will evaluate your current state of emotion.";
    welcomeText += "\nHowever, the algorithm has its limitation, don't expect it to know anything";
    welcomeText += "\nunless you explicitly show your emotion in the picture.";
    return (
      {
        text: welcomeText,
        loaded: true,
        url: false
      }
    );
  },

  componentDidMount() {
    this.startVideoStream();
    this.addListeners();
  },

  addListeners: function() {
    this.captureButton = document.getElementById('capture');
    this.captureButton.addEventListener('click', this.capturePhoto);
    this.emotionStoreListener = EmotionStore.addListener(this.__onChange);
  },

  __onChange: function() {
    this.setState({text: EmotionStore.getGreeting(), loaded: true});
    this.video.play();
    this.captureButton.disabled = false;
  },

  capturePhoto:function() {
    this.setState({ loading: true });
    this.video.pause();
    this.captureButton.disabled = true;
    let canvas = document.getElementById('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    canvas.getContext('2d').drawImage(this.video, 0, 0);
    let dataURI = canvas.toDataURL('image/jpg');
    this.setState({ url: dataURI, loaded: false });
    let blob = this.dataURItoBlob(dataURI);
    EmotionActions.fetchEmotions(blob);
  },

  dataURItoBlob: function(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  },

  startVideoStream: function() {
    navigator.getUserMedia  = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

    this.video = document.querySelector('video');

    if (navigator.getUserMedia) {
      let self = this;
      navigator.getUserMedia(
        { video: true },
        function(stream) { self.video.src = window.URL.createObjectURL(stream); },
        function(err) { console.log("There was this error: " + err); }
      );
    }
  },

  render: function() {
    return (
      <div>
        <div className="video-container">
          <video autoPlay></video>
          <canvas id="canvas" style={{ display: "none"}}></canvas>
          <button id="capture">Capture Photo</button>
        </div>
        <Loader className="spinner" loadedClassName="loadedContent" loaded={this.state.loaded}>
          <div id="message-container">
            {this.state.text}
          </div>
        </Loader>
      </div>
    );
  }

});

module.exports = EmotionDetection;
