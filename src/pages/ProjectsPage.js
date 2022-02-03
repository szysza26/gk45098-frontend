import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider, CircularProgress } from '@material-ui/core';
import ProjectsList from '../components/project/ProjectsList';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
    divider: {
        margin: '10px 0px',
    }
});

const ProjectsPage = ({auth}) => {
    const classes = useStyles();

    const [needUpdateProjects, setNeedUpdateProjects] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if(!needUpdateProjects || !auth?.token) return;

        const url = 'http://localhost:8080/api/projects';
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get(url, config)
            .then(res => {
                setProjects(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setNeedUpdateProjects(false);
            })
        
    }, [needUpdateProjects, auth])

    return (
        <Box className={classes.container}>
            <Typography variant='h4'>
                PROJECTS PAGE
            </Typography>
            <Divider className={classes.divider} />
            {needUpdateProjects ?
                <CircularProgress />
                :
                <ProjectsList 
                    projects={projects}
                />
            }
        </Box>
    );
}

export default ProjectsPage;