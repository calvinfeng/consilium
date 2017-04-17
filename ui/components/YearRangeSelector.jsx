'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React            from 'react';
import { Range }        from 'rc-slider';
import { Button }         from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover }        from 'react-bootstrap';

class YearRangeSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minYear: this.props.movieYearRange.minYear,
            maxYear: this.props.movieYearRange.maxYear,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            minYear: value[0],
            maxYear: value[1],
        });

        if (this.disableTimer) {
            clearTimeout(this.disableTimer);
        }

        this.disableTimer = setTimeout(() => {
            console.log('Modify the movie year range in store');
            // this.props.dispatchSetMovieYearRange(this.state.minYear, this.state.maxYear);
        }, 2000);
    }

    render() {
        const title = `Year: ${this.state.minYear} - ${this.state.maxYear}`;

        const popover = (
            <Popover
                id="popover-positioned-bottom"
                title={title}
                className="year-range-selector">
                <div className="instruction">
                    <p>
                        Slide to filter by year
                    </p>
                </div>
                <div className="slider">
                    <Range
                        disabled={this.props.disabled}
                        defaultValue={[this.state.minYear, this.state.maxYear]}
                        min={1930}
                        max={2016}
                        allowCross={false}
                        onChange={this.handleChange} />
                </div>
            </Popover>
        );

        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button className="year-range-selector-trigger">Filter by year</Button>
            </OverlayTrigger>
        );
    }
}

YearRangeSelector.propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    movieYearRange: React.PropTypes.object.isRequired,
    dispatchSetMovieYearRange: React.PropTypes.func.isRequired
};

export default YearRangeSelector;
