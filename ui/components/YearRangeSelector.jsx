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
            minYear: 1930,
            maxYear: 2016,
            disabled: false
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
            this.setState({
                disabled: true
            });
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
                        Move the slider to select your year range
                    </p>
                </div>
                <div className="slider">
                    <Range
                        disabled={this.state.disabled}
                        defaultValue={[1930, 2016]}
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

export default YearRangeSelector;
