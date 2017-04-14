'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React              from 'react';
import ReactPlayer        from 'react-player';


class MovieTrailer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idx: 0
        };

        this.handleVideoEnded = this.handleVideoEnded.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    handleVideoEnded() {
        let idx = this.state.idx;
        if (this.state.idx < this.props.videoSourceList.length) {
            idx += 1;
        }

        if (idx === this.props.videoSourceList.length) {
            idx = 0;
        }

        this.setState({ idx });
    }

    render() {
        if (this.props.videoSourceList.length > 0) {
            return (
                <ReactPlayer
                    width="100%"
                    height="450"
                    onEnded={this.handleVideoEnded}
                    url={this.props.videoSourceList[this.state.idx]}
                    loop={true}
                    playing={true} />
            );
        }
        return <div />;
    }
}

MovieTrailer.defaultProps = {
    videoSourceList: ''
};

MovieTrailer.propTypes = {
    videoSourceList: React.PropTypes.array,
};

export default MovieTrailer;
