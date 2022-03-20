import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, Snackbar, Select, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Map from '../components/Map';
import FeatureInfo from '../components/layerMap/FeatureInfo';
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

    const [action, setACtion] = useState('info');
    const [requestSynchronizeLayer, setRequestSynchronizeLayer] = useState(false);
    const [needUpdateLayer, setNeedUpdateLayer] = useState(true);
    const [layer, setLayer] = useState(null);

    const [featureInfo, setFeatureInfo] = useState(null);
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

        if(featureCollection && typeof featureCollection === 'string'){
            data.data = JSON.parse(featureCollection);
        }else if(featureCollection){
            data.data = featureCollection;
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
                <Select
                    className={classes.synchronizeButton}
                    value={action}
                    onChange={e => setACtion(e.target.value)}
                >
                    <MenuItem value='info'>
                        INFO
                    </MenuItem>
                    <MenuItem value='draw'>
                        DRAW
                    </MenuItem>
                    <MenuItem value='edit'>
                        EDIT
                    </MenuItem>
                    <MenuItem value='delete'>
                        DELETE
                    </MenuItem>
                </Select>
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
                action={action}
                setFeatureInfo={setFeatureInfo}
                layer={layer}
                requestSynchronizeLayer={requestSynchronizeLayer}
                synchronizeLayer={synchronizeLayer}
            />
            {renderAlert()}
            <FeatureInfo 
                featureInfo={featureInfo}
                setFeatureInfo={setFeatureInfo}
                attributes={layer?.attributes}
            />
            <AttributeTable
                open={openAttributeTable}
                setOpen={setOpenAttributeTable}
                attributes={layer?.attributes}
                data={layer?.data}
                synchronizeLayer={synchronizeLayer}
            />
        </Box>
    );
}

export default LayerMapPage;