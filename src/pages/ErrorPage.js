import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: 20,
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