import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { colors } from '../../helpers/colors';
import ProjectLayerActionDialog from './ProjectLayerActionDialog';

const useStyles = makeStyles({
    container: {
        width: 300,
        height: '100%',
        overflow: 'auto',
    },
    icon: {
        color: colors.black,
    },
});

const ProjectMapMenu = ({open, toggle, project, availableLayers, addProjectLayer, editProjectLayer, deleteProjectLayer}) => {
    const classes = useStyles();

    const [action, setAction] = useState(null);

    const showAddProjectLayerDialog = () => {
        setAction({
            type: 'add',
            id: null,
            projectLayer: {
                nameInLegend: '',
                zIndex: 1,
                style: {
                    pointColor: 'rgba(0, 0, 255, 1.0)',
                    strokeColor: 'rgba(0, 0, 255, 1.0)',
                    fillColor: 'rgba(255, 255, 255, 0.5)',
                    pointSize: 5,
                    strokeWidth: 2
                },
                projectId: project.id,
                layerId: ''
            },
        })
    }

    const showEditProjectLayerDialog = (id, projectLayer) => {
        setAction({
            type: 'edit',
            id: id,
            projectLayer: {
                nameInLegend: projectLayer.nameInLegend,
                zIndex: projectLayer.zIndex,
                style: projectLayer.style,
                projectId: project.id,
                layerId: projectLayer.layerId
            },
        })
    }

    const showDeleteProjectLayerDialog = (id) => {
        setAction({
            type: 'delete',
            id: id,
            projectLayer: null,
        })
    }

    const renderProjectLayerItem = (projectLayer) => {
        return (
            <ListItem  
                key={`projectLayer_item_${projectLayer.nameInLegend}`}
            >
                <ListItemIcon className={classes.icon}>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText>
                    {projectLayer.nameInLegend}
                </ListItemText>
                <ListItemSecondaryAction>
                    <Tooltip title="edit">
                        <IconButton
                            className={classes.editButton}
                            onClick={() => showEditProjectLayerDialog(projectLayer.id, projectLayer)}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="delete">
                        <IconButton
                            className={classes.deleteButton}
                            onClick={() => showDeleteProjectLayerDialog(projectLayer.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    const renderAddProjectLayer = () => {
        return (
            <ListItem 
                button 
                className={classes.addProjectButton}
                onClick={() => showAddProjectLayerDialog()}
            >
                <ListItemText>
                    ADD PROJECT LAYER
                </ListItemText>
            </ListItem>
        )
    }

    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={toggle}
        >
            <Box className={classes.container}>
                <List>
                    {project?.layers.map(projectLayer => renderProjectLayerItem(projectLayer))}
                    {renderAddProjectLayer()}
                </List>
            </Box>
            <ProjectLayerActionDialog
                action={action}
                setAction={setAction}
                availableLayers={availableLayers}
                addProjectLayer={addProjectLayer}
                editProjectLayer={editProjectLayer}
                deleteProjectLayer={deleteProjectLayer}
            />
        </Drawer>
    );
}

export default ProjectMapMenu;