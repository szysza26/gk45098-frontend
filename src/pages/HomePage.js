import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

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