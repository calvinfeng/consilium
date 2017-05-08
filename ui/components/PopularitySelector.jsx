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

    handleChange(value) {
        console.log(value);
    }

    render() {
        const title = 'Filter by review counts';
        const marks = {
            0: 'Any reviews',
            25: '> 50 reviews',
            50: '> 500 reviews',
            75: '> 1000 reviews',
            100: '> 5000 reviews'
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
                    <Slider min={-10} marks={marks} step={null} onChange={this.handleChange} defaultValue={20} />
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
    disabled: React.PropTypes.bool.isRequired
};

export default PopularitySelector;
