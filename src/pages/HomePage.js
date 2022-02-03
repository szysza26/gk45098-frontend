import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
});

const HomePage = ({auth}) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant='h6'>
                <b>Username: </b>{auth.username}
            </Typography>
            <Typography variant='h6'>
                <b>Role: </b>{auth.role}
            </Typography>
            <Typography variant='h6'>
                <b>Token: </b>{auth.token}
            </Typography>
            <Typography variant='h6'>
                <b>Expire: </b>{new Date(auth.exp).toISOString()}
            </Typography>
        </Box>
    );
}

export default HomePage;