import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { layerType } from '../../helpers/layerType';

const useStyles = makeStyles({
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0, 
        margin: 'auto',
    }
})

const LayerActionDialog = ({action, setAction, setNeedUpdateLayers, auth}) => {
    const classes = useStyles();

    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [data, setData] = useState({type: "FeatureCollection", "features": []});

    useEffect(() => {
        if(!auth?.token || !action || action.type === 'add') return;

        setLoad(true);

        const url = `http://localhost:8080/api/layers/${action.id}`;
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get(url, config)
            .then(res => {
                setName(res.data.name);
                setType(res.data.type);
                setData(res.data.data);
                setError(false);
            }).catch(err => {
                setError(true);
            }).finally(() => {
                setLoad(false);
            })

    }, [action, auth])

    const handleChange = (type, value) => {
        switch(type){
            case 'name':
                setName(value);
                break;
            case 'type':
                setType(value);
                break;
            default:
                break;
        }
    }

    const handleOk = () => {
        setLoad(true);

        const url = 'http://localhost:8080/api/layers';
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        let request;
        switch(action.type){
            case 'add':
                request = axios.post(url, {name: name, type: type, data: data}, config);
                break;
            case 'edit':
                request = axios.put(`${url}/${action.id}`, {name: name, type: type, data: data}, config);
                break;
            case 'delete':
                request = axios.delete(`${url}/${action.id}`, config);
                break;
            default:
                return;
        }

        request.then(res => {
            setName('');
            setType('');
            setData({type: "FeatureCollection", "features": []});
            setAction(null);
            setNeedUpdateLayers(true);
            setError(false);
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setLoad(false);
        })

    }

    const handleCancel = () => {
        setName('');
        setType('');
        setData({type: "FeatureCollection", "features": []});
        setAction(null);
    }

    const renderTitle = () => {
        switch(action?.type){
            case 'edit':
                return "Edit Layer"
            case 'delete':
                return "Delete Layer"
            case 'add':
                return "Add Layer"
            default:
                return ""
        }
    }

    const renderForm = () => {
        return (
            <>
                <TextField
                    label='name'
                    fullWidth
                    value={name}
                    onChange={e => handleChange('name', e.target.value)}
                    disabled={load}
                />
                <TextField
                    select
                    label='type'
                    fullWidth
                    value={type}
                    onChange={e => handleChange('type', e.target.value)}
                    disabled={load || action?.type === 'edit'}
                >
                    {layerType.map(option => (
                        <MenuItem key={`layers_type_${option}`} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </>
        )
    }

    const renderContent = () => {
        switch(action?.type){
            case 'delete':
                return `Are you sure to delete layer with name: ${name}`
            case 'edit':
            case 'add':
                return renderForm()
            default:
                return ""
        }
    }

    const renderActions = () => {
        return (
            <>
                <Button 
                    onClick={handleCancel}
                    variant='contained'
                    color='primary'
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleOk}
                    variant='contained'
                    color='primary'
                    disabled={load}
                >
                    OK
                </Button>
            </>
        )
    }

    return (
        <Dialog open={action !== null}>
            <DialogTitle>
                {renderTitle()}
            </DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">Something goes wrong!!!</Alert>}
                {renderContent()}
            </DialogContent>
            <DialogActions>
                {renderActions()}
            </DialogActions>
            {load && <CircularProgress className={classes.loader}/>}
        </Dialog>
    )
}

export default LayerActionDialog;