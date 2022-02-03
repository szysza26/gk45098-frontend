import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

const useStyles = makeStyles({
    container: {
        color: 'red',
    },
});

const ErrorPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            ERROR PAGE
        </Box>
    );
}

export default ErrorPage;