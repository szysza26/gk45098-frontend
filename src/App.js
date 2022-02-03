import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Box } from '@mui/material';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import LayersPage from './pages/LayersPage';
import ErrorPage from './pages/ErrorPage';

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
    </Box>
  );
}

export default App;
