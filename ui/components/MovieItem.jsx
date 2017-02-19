'use strict';

// Copyright 2017 Consilium
// Author(s): Calvin Feng

import React       from 'react';

class MovieItem extends React.Component {

    render() {
        return (
            <div>{this.props.imdbId}</div>

        );
    }

}

export default MovieItem;
