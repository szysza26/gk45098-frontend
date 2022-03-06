import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import { colorToRgba } from '../../helpers/colors';

const useStyles = makeStyles({
    divider: {
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
});

const ProjectLayerActionDialog = ({action, setAction, availableLayers, addProjectLayer, editProjectLayer, deleteProjectLayer}) => {
    const classes = useStyles();

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
            case 'pointColor':
            case 'strokeColor':
            case 'fillColor':
            case 'pointSize':
            case 'strokeWidth':
                setStyle(prev => ({...prev, [type]: value}));
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

    const renderStyleAccordion = () => {
        return (
            <Accordion>
                <AccordionSummary>
                    <Typography>
                        Style
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                <Typography>
                    Point color:
                </Typography>
                <SketchPicker
                    color={style.pointColor}
                    onChangeComplete={color => handleChange('pointColor', colorToRgba(color.rgb))}
                />
                <Divider className={classes.divider}/>
                <Typography>
                    Stroke color:
                </Typography>
                <SketchPicker
                    color={style.strokeColor}
                    onChangeComplete={color => handleChange('strokeColor', colorToRgba(color.rgb))}
                />
                <Divider className={classes.divider}/>
                <Typography>
                    Fill color:
                </Typography>
                <SketchPicker
                    color={style.fillColor}
                    onChangeComplete={color => handleChange('fillColor', colorToRgba(color.rgb))}
                />
                <Divider className={classes.divider}/>
                <TextField
                    label='pointSize'
                    type='number'
                    fullWidth
                    value={style.pointSize}
                    onChange={e => handleChange('pointSize', e.target.value)}
                />
                <Divider className={classes.divider}/>
                <TextField
                    label='strokeWidth'
                    type='number'
                    fullWidth
                    value={style.strokeWidth}
                    onChange={e => handleChange('strokeWidth', e.target.value)}
                />
                    </Box>
                </AccordionDetails>
            </Accordion>
        )
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
                <Divider className={classes.divider}/>
                <TextField
                    label='zIndex'
                    type='number'
                    fullWidth
                    value={zIndex}
                    onChange={e => handleChange('zIndex', e.target.value)}
                />
                <Divider className={classes.divider}/>
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
                <Divider className={classes.divider}/>
                {renderStyleAccordion()}
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