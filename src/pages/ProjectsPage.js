import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

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