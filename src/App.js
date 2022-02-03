import * as React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    color: 'red',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Hello World
    </div>
  );
}

export default App;
