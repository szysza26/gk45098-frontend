import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        color: 'red',
    },
});

const ProjectsPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            PROJECTS PAGE
        </Box>
    );
}

export default ProjectsPage;