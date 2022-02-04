import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Box } from '@material-ui/core';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectMapPage from './pages/ProjectMapPage';
import LayersPage from './pages/LayersPage';
import LayerMapPage from './pages/LayerMapPage';
import ErrorPage from './pages/ErrorPage';
import Login from './components/auth/Login';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    marginTop: 64,
  },
});

const App = () => {
  const classes = useStyles();

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if(!auth){
      const token = localStorage.getItem('token');
      
      if(!token) return;

      try{
        const data = jwt_decode(token);
        setAuth({
          token: token,
          role: data.role,
          username: data.sub,
          exp: data.exp
        })
      }catch(e){
        console.log(e);
      }
    }else{
      const curentTime = new Date().getTime();
      const expireTime = auth.exp * 1000;
      const delta = expireTime - curentTime;
      if(delta <= 0){
        localStorage.removeItem('token');
        setAuth(null);
      }else{
        localStorage.setItem('token', auth.token)
        const timeout = setTimeout(() => {
          localStorage.removeItem('token');
          setAuth(null);
        }, delta)
        return () => {
          clearTimeout(timeout);
        }
      }
    }

  }, [auth])

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Nav/>
      {
        auth === null ?
          <Login
            auth={auth}
            setAuth={setAuth}
          />
        :
        <Box className={classes.content}>
          <Routes>
            <Route path="/" element={<HomePage auth={auth} />} />
            <Route path="/projects" element={<ProjectsPage auth={auth} />} />
            <Route path="/projects/:id/map" element={<ProjectMapPage auth={auth} />} />
            <Route path="/layers" element={<LayersPage auth={auth} />} />
            <Route path="/layers/:id/map" element={<LayerMapPage auth={auth} />} />
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Box>
      }
    </Box>
  );
}

export default App;
