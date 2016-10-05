const React = require('react');
const MovieInfoStore = require('../stores/movie_info_store');
const Carousel = require('react-bootstrap').Carousel;
const CarouselItem = require('react-bootstrap').CarouselItem;

const PosterSlider = React.createClass({

  getInitialState() {
    return {moviePosters: {}};
  },

  componentDidMount() {
    this.movieInfoStoreListener = MovieInfoStore.addListener(this.__onChange);
  },

  componentWillUnmount() {
    this.movieInfoStoreListener.remove();
  },

  componentWillReceiveProps(nextProps) {
    this.setPoster(nextProps.movies);
  },

  __onChange() {
    this.setPoster(this.props.movies);
  },

  setPoster(movies) {
    let posters = {};
    Object.keys(movies).forEach((movieId) => {
      let movie = this.props.movies[movieId];
      if (MovieInfoStore.getPoster(movie.imdbId)) {
        posters[movieId] = MovieInfoStore.getPoster(movie.imdbId);
      }
    });
    this.setState({moviePosters: posters});
  },

  postersReady() {
    return Object.keys(this.state.moviePosters).length === Object.keys(this.props.movies).length;
  },

  renderItems() {
    let ids = Object.keys(this.props.movies);
    let carouselItems = [];
    let numberPerRow = 4;
    for (let i = 0; i < ids.length; i++) {
      if (i%numberPerRow === 0) {
        let j = i;
        let imgs = [];
        while (j < i + numberPerRow && j < ids.length) {
          imgs.push(<img src={this.state.moviePosters[ids[j]]} key={ids[j]}></img>);
          j += 1;
        }
        carouselItems.push(
          <CarouselItem key={i}>
            <div className="item-container">
              {imgs}
            </div>
          </CarouselItem>
        );
      }
    }
    return carouselItems;
  },

  render() {
    if (this.postersReady()) {
      return (
        <Carousel>
          {this.renderItems()}
        </Carousel>
      );
    } else {
      return <div></div>;
    }
  }

});

module.exports = PosterSlider;
