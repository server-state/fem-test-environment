import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function MyFEM(props) {
    return (
        <div>
            <Typography>
                Empty FEM module
            </Typography>
            <Typography>
                Data: {JSON.stringify(props.data, null, 2)}
            </Typography>
        </div>
    );
}

MyFEM.propTypes = {
    data: PropTypes.any.isRequired
};

export default MyFEM;