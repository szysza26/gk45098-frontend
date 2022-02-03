import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core';
import { colors } from '../../helpers/colors';
import MapIcon from '@material-ui/icons/Map';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {},
    content: {},
    listItem: {
        border: '1px solid black',
        borderRadius: 5,
        margin: '5px 0px',
    },
    icon: {
        color: colors.black,
    },
    showButton: {
        backgroundColor: colors.info,
        color: colors.white,
        "&:hover": {
            backgroundColor: colors.info,
            opacity: 0.5,
        },
        marginRight: 5,
        padding: 5,
    },
    editButton: {
        backgroundColor: colors.warning,
        color: colors.white,
        "&:hover": {
            backgroundColor: colors.warning,
            opacity: 0.5,
        },
        marginRight: 5,
        padding: 5,
    },
    deleteButton: {
        backgroundColor: colors.error,
        color: colors.white,
        "&:hover": {
            backgroundColor: colors.error,
            opacity: 0.5,
        },
        padding: 5,
    },
    addProjectButton: {
        backgroundColor: colors.info,
        "&:hover": {
            backgroundColor: colors.info,
            opacity: 0.5,
        },
        border: '1px solid black',
        borderRadius: 5,
        margin: '5px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const ProjectsList = ({projects}) => {
    const classes = useStyles();

    const renderProjectItem = ({id, name}) => {
        return (
            <ListItem  
                key={`project_item_${id}`}
                className={classes.listItem}
            >
                <ListItemIcon className={classes.icon}>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText>
                    {name}
                </ListItemText>
                <ListItemSecondaryAction>
                    <Tooltip title="show">
                        <IconButton
                            className={classes.showButton}
                            onClick={e => console.log('show', id)}
                        >
                            <VisibilityIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="edit">
                        <IconButton
                            className={classes.editButton}
                            onClick={e => console.log('edit', id)}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="delete">
                        <IconButton
                            className={classes.deleteButton}
                            onClick={e => console.log('delete', id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    const renderAddProject = () => {
        return (
            <ListItem 
                button 
                className={classes.addProjectButton}
                onClick={e => console.log('add')}
            >
                ADD PROJECT
            </ListItem>
        )
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography variant='h6'>
                    Projects list:
                </Typography>
            </Box>
            <Box className={classes.content}>
                <List>
                    {projects.map(project => renderProjectItem(project))}
                    {renderAddProject()}
                </List>
            </Box>
        </Box>
    );
}

export default ProjectsList;