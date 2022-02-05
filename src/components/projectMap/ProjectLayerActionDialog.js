import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@material-ui/core';

const ProjectLayerActionDialog = ({action, setAction, availableLayers, addProjectLayer, editProjectLayer, deleteProjectLayer}) => {
    const [nameInLegend, setNameInLegend] = useState('');
    const [zIndex, setZIndex] = useState(0);
    const [style, setStyle] = useState({});
    const [projectId, setProjectId] = useState('');
    const [layerId, setLayerId] = useState('');

    useEffect(() => {
        if(!action || !action.projectLayer) return;

        setNameInLegend(action.projectLayer.nameInLegend);
        setZIndex(action.projectLayer.zIndex);
        setStyle(action.projectLayer.style);
        setProjectId(action.projectLayer.projectId);
        setLayerId(action.projectLayer.layerId);

    }, [action])

    const handleChange = (type, value) => {
        switch(type){
            case 'nameInLegend':
                setNameInLegend(value);
                break;
            case 'zIndex':
                setZIndex(value);
                break;
            case 'layerId':
                setLayerId(value);
                break;
            default:
                break;
        }
    }

    const handleOk = () => {
        switch(action.type){
            case 'add':
                addProjectLayer({
                    nameInLegend: nameInLegend,
                    zIndex: zIndex,
                    style: style,
                    projectId: projectId,
                    layerId: layerId
                });
                break;
            case 'edit':
                editProjectLayer(action.id, {
                    nameInLegend: nameInLegend,
                    zIndex: zIndex,
                    style: style,
                    projectId: projectId,
                    layerId: layerId
                });
                break;
            case 'delete':
                deleteProjectLayer(action.id);
                break;
            default:
                return;
        }
        setAction(null);
    }

    const handleCancel = () => {
        setAction(null);
    }

    const renderTitle = () => {
        switch(action?.type){
            case 'edit':
                return "Edit Project Layer"
            case 'delete':
                return "Delete Project Layer"
            case 'add':
                return "Add Project Layer"
            default:
                return ""
        }
    }

    const renderForm = () => {
        return (
            <>
                <TextField
                    label='nameInLegend'
                    fullWidth
                    value={nameInLegend}
                    onChange={e => handleChange('nameInLegend', e.target.value)}
                />
                <TextField
                    label='zIndex'
                    type='number'
                    fullWidth
                    value={zIndex}
                    onChange={e => handleChange('zIndex', e.target.value)}
                />
                <TextField
                    label='layer'
                    select
                    fullWidth
                    value={layerId}
                    onChange={e => handleChange('layerId', e.target.value)}
                    disabled={action?.type === 'edit'}
                >
                    {availableLayers.map(layer => (
                        <MenuItem key={`layer_${layer.id}`} value={layer.id}>
                            {layer.name}
                        </MenuItem>
                    ))}
                </TextField>
            </>
        )
    }

    const renderContent = () => {
        switch(action?.type){
            case 'delete':
                return `Are you sure to delete project layer with name: ${nameInLegend}`
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
                {renderContent()}
            </DialogContent>
            <DialogActions>
                {renderActions()}
            </DialogActions>
        </Dialog>
    )
}

export default ProjectLayerActionDialog;