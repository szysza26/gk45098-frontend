import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
});

const ErrorPage = () => {
    const classes = useStyles();

    return (
        <Container fixed className={classes.container}>
            ERROR PAGE
        </Container>
    );
}

export default ErrorPage;