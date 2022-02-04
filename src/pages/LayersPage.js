import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LayersList from '../components/layer/LayerList';
import LayerActionDialog from '../components/layer/LayerActionDialog';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
    divider: {
        margin: '10px 0px',
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0, 
        margin: 'auto',
    }
});

const LayersPage = ({auth}) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [needUpdateLayers, setNeedUpdateLayers] = useState(true);
    const [layers, setLayers] = useState([])
    const [action, setAction] = useState(null);

    useEffect(() => {
        if(!needUpdateLayers || !auth?.token) return;

        const url = 'http://localhost:8080/api/layers';
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get(url, config)
            .then(res => {
                setLayers(res.data);
                setError(false);
            }).catch(err => {
                setError(true);
            }).finally(() => {
                setNeedUpdateLayers(false);
            })

    }, [needUpdateLayers, auth])

    const showLayer = id => {
        navigate(`/layers/${id}/map`)
    }

    const editLayer = id => {
        setAction({
            type: 'edit',
            id: id,
        })
    }

    const deleteLayer = id => {
        setAction({
            type: 'delete',
            id: id,
        })
    }

    const addLayer = () => {
        setAction({
            type: 'add',
            id: null,
        })
    }

    return (
        <Box className={classes.container}>
            <Typography variant='h4'>
                LAYERS PAGE
            </Typography>
            <Divider className={classes.divider} />
            {needUpdateLayers ?
                <CircularProgress className={classes.loader} />
                :
                error ?
                    <Alert severity="error">Failed to load layers</Alert>
                    :
                    <LayersList 
                        layers={layers}
                        showLayer={showLayer}
                        editLayer={editLayer}
                        deleteLayer={deleteLayer}
                        addLayer={addLayer}
                    />
            }
            <LayerActionDialog
                action={action}
                setAction={setAction}
                setNeedUpdateLayers={setNeedUpdateLayers}
                auth={auth}
            />
        </Box>
    );
}

export default LayersPage;