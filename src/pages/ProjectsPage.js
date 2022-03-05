import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, CircularProgress, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ProjectsList from '../components/project/ProjectsList';
import ProjectActionDialog from '../components/project/ProjectActionDialog';

const useStyles = makeStyles({
    container: {
        padding: 20,
    },
    divider: {
        margin: '10px 0px',
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0, 
        margin: 'auto',
    }
});

const ProjectsPage = ({auth}) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [needUpdateProjects, setNeedUpdateProjects] = useState(true);
    const [projects, setProjects] = useState([]);
    const [action, setAction] = useState(null);

    useEffect(() => {
        if(!needUpdateProjects || !auth?.token) return;

        const url = 'http://localhost:8080/api/projects';
        const config = { headers: { Authorization: `Bearer ${auth.token}` } }

        axios.get(url, config)
            .then(res => {
                setProjects(res.data);
                setError(false);
            }).catch(err => {
                setError(true);
            }).finally(() => {
                setNeedUpdateProjects(false);
            })
        
    }, [needUpdateProjects, auth])

    const showProject = id => {
        navigate(`/projects/${id}/map`)
    }

    const editProject = id => {
        setAction({
            type: 'edit',
            id: id,
        })
    }

    const deleteProject = id => {
        setAction({
            type: 'delete',
            id: id,
        })
    }

    const addProject = () => {
        setAction({
            type: 'add',
            id: null,
        })
    }

    return (
        <Container fixed className={classes.container}>
            <Typography variant='h4'>
                PROJECTS PAGE
            </Typography>
            <Divider className={classes.divider} />
            {needUpdateProjects ?
                <CircularProgress className={classes.loader} />
                :
                error ?
                    <Alert severity="error">Failed to load projects</Alert>
                    :
                    <ProjectsList 
                        projects={projects}
                        showProject={showProject}
                        editProject={editProject}
                        deleteProject={deleteProject}
                        addProject={addProject}
                    />
            }
            <ProjectActionDialog
                action={action}
                setAction={setAction}
                setNeedUpdateProjects={setNeedUpdateProjects}
                auth={auth}
            />
        </Container>
    );
}

export default ProjectsPage;