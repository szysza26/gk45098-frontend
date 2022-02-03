import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

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