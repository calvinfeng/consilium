'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React            from 'react';
import Slider           from 'rc-slider';
import { Button }         from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover }        from 'react-bootstrap';

class PopularitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percentile: this.props.movieRatingCountPercentile
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            percentile: value
        });

        if (this.disableTimer) {
            clearTimeout(this.disableTimer);
        }

        this.disableTimer = setTimeout(() => {
            this.props.dispatchSetMovieRatingCountPercentile(this.state.percentile);
        }, 1000);
    }

    render() {
        let title;

        switch (this.state.percentile) {
            case 0:
                title = 'Movies with any reviews';
                break;
            case 20:
                title = '> 20th percentile';
                break;
            case 50:
                title = '> 50th percentile';
                break;
            case 80:
                title = '> 80th percentile';
                break;
            case 100:
                title = 'Most reviewed movies';
                break;
        }

        const marks = {
            0: 'Any',
            20: '> 20th',
            50: '> 50th',
            80: '> 80th',
            100: 'Top'
        };

        const popover = (
            <Popover
                id="popover-positioned-bottom"
                title={title}
                className="popularity-selector">
                <div className="instruction">
                    <p>
                        Slide to filter by reviews
                    </p>
                </div>
                <div className="slider">
                    <Slider
                        disabled={this.props.disabled}
                        min={0}
                        marks={marks}
                        step={null}
                        onChange={this.handleChange}
                        defaultValue={this.state.percentile} />
                </div>
            </Popover>
        );

        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button className="popularity-selector-trigger">Filter by Reviews</Button>
            </OverlayTrigger>
        );
    }
}

PopularitySelector.propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    movieRatingCountPercentile: React.PropTypes.number.isRequired,
    dispatchSetMovieRatingCountPercentile: React.PropTypes.func.isRequired
};

export default PopularitySelector;
