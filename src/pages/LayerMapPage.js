import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Map from '../components/Map';
import AttributeTable from '../components/layerMap/AttributeTable';

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

    const [alert, setAlert] = useState(null);

    const [requestSynchronizeLayer, setRequestSynchronizeLayer] = useState(false);
    const [needUpdateLayer, setNeedUpdateLayer] = useState(true);
    const [layer, setLayer] = useState(null);

    const [openAttributeTable, setOpenAttributeTable] = useState(false);

    useEffect(() => {
        if(!needUpdateLayer || !auth?.token) return;

        const url = `http://localhost:8080/api/layers/${params.id}`;
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get(url, config)
            .then(res => {
                setLayer(res.data);
            }).catch(err => {
                console.log(err);
                setAlert({
                    type: 'error',
                    text: 'Failed load layer.'
                });
            }).finally(() => {
                setNeedUpdateLayer(false);
            })

    }, [needUpdateLayer, auth, params])

    const synchronizeLayer = (featureCollection, attributes) => {
        const url = `http://localhost:8080/api/layers/${params.id}`
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        const data = layer;

        if(featureCollection){
            data.data = JSON.parse(featureCollection);
        }

        if(attributes){
            data.attributes = attributes;
        }

        delete data.id
        delete data.data.id
        data.data.features.forEach(feature => delete feature.id)
        data.attributes.forEach(attribute => delete attribute.id)

        axios.put(url, data, config)
            .then(res => {
                setAlert({
                    type: 'success',
                    text: 'Success synchronize layer.'
                });
            })
            .catch(err => {
                console.log(err);
                setAlert({
                    type: 'error',
                    text: 'Failed synchronize layer.'
                });
            }).finally(() => {
                setRequestSynchronizeLayer(false);
                setNeedUpdateLayer(true);
            })
    }

    const renderAlert = () => {
        return (
            <Snackbar open={!!alert} autoHideDuration={10000} onClose={() => setAlert(null)}>
                <Alert onClose={() => setAlert(null)} severity={alert?.type}>
                    {alert?.text}
                </Alert>
            </Snackbar>
        )
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
                <Button 
                    className={classes.synchronizeButton}
                    variant='contained'
                    onClick={() => setOpenAttributeTable(true)}
                >
                    ATTRIBUTES
                </Button>
            </Box>
            <Map
                layer={layer}
                requestSynchronizeLayer={requestSynchronizeLayer}
                synchronizeLayer={synchronizeLayer}
            />
            {renderAlert()}
            <AttributeTable
                open={openAttributeTable}
                setOpen={setOpenAttributeTable}
                attributes={layer?.attributes}
                synchronizeLayer={synchronizeLayer}
            />
        </Box>
    );
}

export default LayerMapPage;