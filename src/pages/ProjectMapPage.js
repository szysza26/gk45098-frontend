import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
});

const ProjectMapPage = () => {
    const classes = useStyles();
    const params = useParams();

    return (
        <Box className={classes.container}>
            Project Map Page with id: {params.id}
        </Box>
    );
}

export default ProjectMapPage;