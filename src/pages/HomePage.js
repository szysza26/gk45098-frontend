import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
});

const HomePage = ({auth}) => {
    const classes = useStyles();

    const [projectCount, setProjectCount] = useState(0);
    const [layerCount, setLayerCount] = useState(0);

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get('http://localhost:8080/api/projects', config)
            .then(res => {
                setProjectCount(res.data.length);
            })

        axios.get('http://localhost:8080/api/layers', config)
            .then(res => {
                setLayerCount(res.data.length);
            })
        
    }, [auth.token])

    return (
        <Container fixed className={classes.container}>
            <Typography variant='h6'>
                <b>Username: </b>{auth.username}
            </Typography>
            <Typography variant='h6'>
                <b>Project count: </b>{projectCount}
            </Typography>
            <Typography variant='h6'>
                <b>Layer count: </b>{layerCount}
            </Typography>
        </Container>
    );
}

export default HomePage;