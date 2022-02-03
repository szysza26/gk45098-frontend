import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    actions: {
        justifyContent: 'center',
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

const Login = ({auth, setAuth}) => {
    const classes = useStyles();

    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (type, value) => {
        switch(type){
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
        setError(false);
    }

    const handleSubmit = () => {
        setLoad(true);

        const url = 'http://localhost:8080/api/login';
        const data = { username: username, password: password };

        axios.post(url, data).then(res => {
            const token = res.data.token;
            const data = jwt_decode(token);
            setUsername('');
            setPassword('');
            setError(false);
            setAuth({
                token: res.data.token,
                role: data.role,
                username: data.sub,
                exp: data.exp
            })
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setLoad(false);
        })
    }

    return (
        <Dialog
            open={auth === null}
        >
            <DialogTitle>
                Login
            </DialogTitle>
            <DialogContent>
                <TextField
                    label='username'
                    fullWidth
                    value={username}
                    onChange={e => handleChange('username', e.target.value)}
                    error={error}
                    disabled={load}
                />
                <TextField
                    label='password'
                    fullWidth
                    type='password'
                    value={password}
                    onChange={e => handleChange('password', e.target.value)}
                    error={error}
                    disabled={load}
                />
            </DialogContent>
            <DialogActions
                className={classes.actions}
            >
                <Button 
                    onClick={handleSubmit}
                    variant='contained'
                    color='primary'
                    disabled={load}
                >
                    Login
                </Button>
            </DialogActions>
            {load && <CircularProgress className={classes.loader}/>}
        </Dialog>
    );
}

export default Login;