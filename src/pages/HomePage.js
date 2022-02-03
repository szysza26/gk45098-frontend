import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        color: 'red',
    },
});

const HomePage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            HOME PAGE
        </Box>
    );
}

export default HomePage;