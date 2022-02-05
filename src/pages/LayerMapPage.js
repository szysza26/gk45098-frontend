import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
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
    },
    synchronizeButton: {
        pointerEvents: 'auto',
    },
});

const LayerMapPage = ({auth}) => {
    const classes = useStyles();
    const params = useParams();

    const [requestSynchronizeLayer, setRequestSynchronizeLayer] = useState(false);
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

    const synchronizeLayer = (featureCollection) => {
        const url = `http://localhost:8080/api/layers/${params.id}`
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        const data = {
            ...layer,
            data: JSON.parse(featureCollection)
        }
        delete data.id
        delete data.data.id
        data.data.features.forEach(feature => delete feature.id)

        axios.put(url, data, config)
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setRequestSynchronizeLayer(false);
                setNeedUpdateLayer(true);
            })
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography variant='h6'>
                    Layer Map Page with id: {params.id}
                </Typography>
                <Button 
                    className={classes.synchronizeButton}
                    variant='contained'
                    onClick={() => setRequestSynchronizeLayer(true)}
                >
                    SYNCHRONIZE
                </Button>
            </Box>
            <Map
                layer={layer}
                requestSynchronizeLayer={requestSynchronizeLayer}
                synchronizeLayer={synchronizeLayer}
            />
        </Box>
    );
}

export default LayerMapPage;