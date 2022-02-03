import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        color: 'red',
    },
});

const LayersPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            LAYERS PAGE
        </Box>
    );
}

export default LayersPage;