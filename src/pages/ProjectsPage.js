import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider } from '@material-ui/core';
import ProjectsList from '../components/project/ProjectsList';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
    divider: {
        margin: '10px 0px',
    }
});

const ProjectsPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant='h4'>
                PROJECTS PAGE
            </Typography>
            <Divider className={classes.divider} />
            <ProjectsList 
                projects={[
                    {id: 1, name: "Project1"},
                    {id: 2, name: "Project2"},
                    {id: 3, name: "Project3"},
                ]}
            />
        </Box>
    );
}

export default ProjectsPage;