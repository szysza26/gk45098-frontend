import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';   
import { colors } from '../helpers/colors';

const useStyles = makeStyles(theme => ({
    button: {
        color: colors.white,
    },
    containerNormalMenu: {
        display: 'none',
        [theme.breakpoints.up('600')]: {
            display: 'flex'
        },
    },
    containerMobileMenu: {
        display: 'flex',
        [theme.breakpoints.up('600')]: {
            display: 'none'
        },
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
}));

const pages = [
    {name: 'HOME', path: '/'},
    {name: 'Projects', path: '/projects'},
    {name: 'Layers', path: '/layers'},
]

const Nav = () => {
    const classes = useStyles();

    const [anchorElNav, setAnchorElNav] = useState(false);

    const handleOpenNavMenu = () => {
        setAnchorElNav(prev => !prev);
    }

    const renderButtons = () => {
        return (
            pages.map((page) => (
                <Button
                    className={classes.button}
                    key={`nav_button_${page.name}`}
                    component={Link} to={page.path}
                >
                    {page.name}
                </Button>
            ))
        )
    }

    const renderMobileMenu = () => {
        return (
            <Box className={classes.containerMobileMenu}>
                <IconButton
                    className={classes.button}
                    onClick={handleOpenNavMenu}
                >
                    <MenuIcon />
                </IconButton>
                {anchorElNav && renderButtons()}
            </Box>
        )
    }

    const renderNormalMenu = () => {
        return (
            <Box className={classes.containerNormalMenu}>
                {renderButtons()}
            </Box>
        )
    }

    return (
        <AppBar>
            <Toolbar>
                {renderMobileMenu()}
                {renderNormalMenu()}
            </Toolbar>
        </AppBar>
    )
}

export default Nav