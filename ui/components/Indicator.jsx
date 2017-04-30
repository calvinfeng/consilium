'use strict';

/**
 * @copyright Consilium, 2017
 * @author Calvin Feng
 */

import React            from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';


class Indicator extends React.Component {
    render() {
        const style = {
            display: 'flex',
            position: 'relative'
        };

        if (this.props.isFetching) {
            return (
                <div className="indicator">
                    <RefreshIndicator
                        size={50}
                        left={0}
                        top={0}
                        loadingColor="#FF9800"
                        status="loading"
                        style={style} />
                </div>
            );
        }

        return (
            <div className="indicator">
                <RefreshIndicator
                    size={50}
                    left={0}
                    top={0}
                    loadingColor="#FF9800"
                    status="hide"
                    style={style} />
            </div>
        );
    }
}

Indicator.propTypes = {
    isFetching: React.PropTypes.bool.isRequired
};

export default Indicator;
