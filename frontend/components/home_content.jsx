const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Carousel = require('react-bootstrap').Carousel;

const HomeContent = React.createClass({
  render: function() {
    return (
      <div className="carousel">
        <Carousel interval="2000">
          <Carousel.Item>
            <img src="http://res.cloudinary.com/vechau/image/upload/v1467271000/photo-1453090927415-5f45085b65c0_o2iojc.jpg"/>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="http://res.cloudinary.com/vechau/image/upload/v1467272765/photo-1445965752525-ac2d3c195ffe_qdcaum.jpg"/>
          </Carousel.Item>
          <Carousel.Item>
            <img src="http://res.cloudinary.com/vechau/image/upload/v1467272522/photo-1450859018738-29f67b1a6102_mmvfxu.jpg"/>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }

});

module.exports = HomeContent;
