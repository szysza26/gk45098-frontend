import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Divider, Typography } from '@material-ui/core';
import { colors } from '../../helpers/colors';

const useStyles = makeStyles({
    dialog: {
        padding: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: colors.blackTransparent,
        borderRadius: 3,
        height: 6,
    }
});

const Login = ({auth, setAuth}) => {
    const classes = useStyles();

    const handleSuccess = res => {
        console.log(res)
        setAuth({
            token: res.tokenId,
            username: res.profileObj.email,
            exp: res.tokenObj.expires_at
        })
    }

    const handleError = err => {
        console.log(err);
        setAuth(null);
    }

    return (
        <Dialog
            open={auth === null}
            classes={{paper: classes.dialog}}
        >
            <Typography>
                Logowanie
            </Typography>
            <Divider className={classes.divider}/>
            <GoogleLogin
                clientId="584824258037-4odhcu6i4lhso2hd5ucuv5tn3r1d7563.apps.googleusercontent.com"
                onSuccess={handleSuccess}
                onFailure={handleError}
            />
        </Dialog>
    );
}

export default Login;