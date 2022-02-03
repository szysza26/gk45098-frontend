import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Box } from '@material-ui/core';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import LayersPage from './pages/LayersPage';
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
    console.log(auth);
  }, [auth])

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Nav/>
      <Box className={classes.content}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/projects" element={<ProjectsPage/>} />
          <Route path="/layers" element={<LayersPage/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Box>
      <Login
        auth={auth}
        setAuth={setAuth}
      />
    </Box>
  );
}

export default App;
