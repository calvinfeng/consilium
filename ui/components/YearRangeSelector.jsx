'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React            from 'react';
import { Range }        from 'rc-slider';

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
        return (
            <div className="year-range-selector">
                <div className="instruction">
                    <h1>
                        Year: {this.state.minYear} - {this.state.maxYear}
                    </h1>
                </div>
                <div className="slider">
                    <Range
                        disabled={this.state.disabled}
                        defaultValue={[1930, 2016]}
                        min={1930}
                        max={2016}
                        allowCross={false}
                        tipFormatter={(value) => `${value}%`}
                        onChange={this.handleChange} />
                </div>
            </div>
        );
    }

}

export default YearRangeSelector;
