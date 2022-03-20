import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, IconButton, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Map from '../components/Map';
import MenuIcon from '@material-ui/icons/Menu';
import ProjectMapMenu from '../components/projectMap/ProjectMapMenu';
import Info from '../components/projectMap/Info';

const useStyles = makeStyles({
    container: {
        margin: 0,
        padding: 0,
        height: '100%',
    },
    header: {
        zIndex: 10,
        pointerEvents: 'none',
        width: '100%',
        position: 'absolute',
        textAlign: 'center',
    },
    hamburger: {
        pointerEvents: 'auto',
    },
});

const ProjectMapPage = ({auth}) => {
    const classes = useStyles();
    const params = useParams();

    const [alert, setAlert] = useState(null);

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [needUpdateProject, setNeedUpdateProject] = useState(true);
    const [project, setProject] = useState(null);
    const [availableLayers, setAvailableLayers] = useState([]);

    const [info, setInfo] = useState(null);

    useEffect(() => {
        if(!auth?.token) return;

        const config = { headers: { Authorization: `Bearer ${auth.token}` } }
        const url = 'http://localhost:8080/api/layers';

        axios.get(url, config)
            .then(res => {
                setAvailableLayers(res.data);
            }).catch(err => {
                console.log(err);
                setAlert({
                    type: 'error',
                    text: 'Failed load available layers.'
                });
            })

    }, [auth, params])

    useEffect(() => {
        if(!needUpdateProject || !auth?.token) return;

        const config = { headers: { Authorization: `Bearer ${auth.token}` } }
        const url = `http://localhost:8080/api/projects/${params.id}`;

        axios.get(url, config)
            .then(res => {
                setProject(res.data);
            }).catch(err => {
                console.log(err);
                setAlert({
                    type: 'error',
                    text: 'Failed load project.'
                });
            }).finally(() => {
                setNeedUpdateProject(false);
            })

    }, [needUpdateProject, auth, params])

    const toggleMenu = () => {
        setIsOpenMenu(prev => !prev);
    }

    const addProjectLayer = (data) => {
        const url = 'http://localhost:8080/api/projectlayers';
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };

        axios.post(url, data, config)
            .then(res => {
                setNeedUpdateProject(true);
                setAlert({
                    type: 'success',
                    text: 'Success add layer to project.'
                });
            }).catch(err => {
                console.log(err);
                setAlert({
                    type: 'error',
                    text: 'Failed add layer to project.'
                });
            })
    }

    const editProjectLayer = (id, data) => {
        const url = `http://localhost:8080/api/projectlayers/${id}`;
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };

        axios.put(url, data, config)
            .then(res => {
                setNeedUpdateProject(true);
                setAlert({
                    type: 'success',
                    text: 'Success edit project layer.'
                });
            }).catch(err => {
                console.log(err);
                setAlert({
                    type: 'error',
                    text: 'Failed edit project layer.'
                });
            })
    }

    const deleteProjectLayer = (id) => {
        const url = `http://localhost:8080/api/projectlayers/${id}`;
        const config = { headers: { Authorization: `Bearer ${auth.token}` } };

        axios.delete(url, config)
            .then(res => {
                setNeedUpdateProject(true);
                setAlert({
                    type: 'success',
                    text: 'Success remove project layer.'
                });
            }).catch(err => {
                console.log(err);
                setAlert({
                    type: 'error',
                    text: 'Failed remove project layer.'
                });
            })
    }

    const renderAlert = () => {
        return (
            <Snackbar open={!!alert} autoHideDuration={10000} onClose={() => setAlert(null)}>
                <Alert onClose={() => setAlert(null)} severity={alert?.type}>
                    {alert?.text}
                </Alert>
            </Snackbar>
        )
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography variant='h6'>
                    Project Map Page - name: {project?.name}, id: {project?.id}
                </Typography>
                <IconButton 
                    className={classes.hamburger}
                    onClick={toggleMenu}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <ProjectMapMenu
                open={isOpenMenu}
                toggle={toggleMenu}
                project={project}
                availableLayers={availableLayers}
                addProjectLayer={addProjectLayer}
                editProjectLayer={editProjectLayer}
                deleteProjectLayer={deleteProjectLayer}
            />
            <Info
                info={info}
                setInfo={setInfo}
            />
            <Map
                project={project}
                auth={auth}
                setInfo={setInfo}
            />
            {renderAlert()}
        </Box>
    );
}

export default ProjectMapPage;