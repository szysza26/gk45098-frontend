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

    const fetch = async () => {
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        const projects = await axios.get('http://localhost:8080/api/projects', config);
        const layers = await axios.get('http://localhost:8080/api/layers', config);

        if(projects?.data?.length) setProjectCount(projects.data.length);
        if(layers?.data?.length) setLayerCount(layers.data.length);
    }

    useEffect(() => {
        fetch();
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