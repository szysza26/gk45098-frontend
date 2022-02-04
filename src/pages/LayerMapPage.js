import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Map from '../components/Map';

const useStyles = makeStyles({
    container: {
        margin: 0,
        padding: 0,
        height: '100%',
    },
    header: {
        zIndex: 10,
        pointerEvents: 'none',
        width: '100%',
        position: 'absolute',
        textAlign: 'center',
    }
});

const LayerMapPage = ({auth}) => {
    const classes = useStyles();
    const params = useParams();

    const [needUpdateLayer, setNeedUpdateLayer] = useState(true);
    const [layer, setLayer] = useState(null);

    useEffect(() => {
        if(!needUpdateLayer || !auth?.token) return;

        const url = `http://localhost:8080/api/layers/${params.id}`;
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get(url, config)
            .then(res => {
                setLayer(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setNeedUpdateLayer(false);
            })

    }, [needUpdateLayer, auth, params])

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography variant='h6'>
                    Layer Map Page with id: {params.id}
                </Typography>
            </Box>
            <Map
                layer={layer}
            />
        </Box>
    );
}

export default LayerMapPage;