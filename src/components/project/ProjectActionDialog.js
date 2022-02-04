import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

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

const ProjectActionDialog = ({action, setAction, setNeedUpdateProjects, auth}) => {
    const classes = useStyles();

    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if(!auth?.token || !action || action.type === 'add') return;

        setLoad(true);

        const url = `http://localhost:8080/api/projects/${action.id}`;
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get(url, config)
            .then(res => {
                setName(res.data.name);
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
            default:
                break;
        }
    }

    const handleOk = () => {
        setLoad(true);

        const url = 'http://localhost:8080/api/projects';
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        let request;
        switch(action.type){
            case 'add':
                request = axios.post(url, {name: name}, config);
                break;
            case 'edit':
                request = axios.put(`${url}/${action.id}`, {name: name}, config);
                break;
            case 'delete':
                request = axios.delete(`${url}/${action.id}`, config);
                break;
            default:
                return;
        }

        request.then(res => {
            setName('');
            setAction(null);
            setNeedUpdateProjects(true);
            setError(false);
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setLoad(false);
        })

    }

    const handleCancel = () => {
        setName('');
        setAction(null);
    }

    const renderTitle = () => {
        switch(action?.type){
            case 'edit':
                return "Edit project"
            case 'delete':
                return "Delete project"
            case 'add':
                return "Add project"
            default:
                return ""
        }
    }

    const renderForm = () => {
        return (
            <TextField
                label='name'
                fullWidth
                value={name}
                onChange={e => handleChange('name', e.target.value)}
                disabled={load}
            />
        )
    }

    const renderContent = () => {
        switch(action?.type){
            case 'delete':
                return `Are you sure to delete project with name: ${name}`
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

export default ProjectActionDialog;