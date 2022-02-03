import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';;   

const Nav = () => {

    const [anchorElNav, setAnchorElNav] = useState(false);

    const pages = [
        {name: 'HOME', path: '/'},
        {name: 'Projects', path: '/projects'},
        {name: 'Layers', path: '/layers'},
    ]

    const handleOpenNavMenu = () => {
        setAnchorElNav(prev => !prev);
    }

    const renderButtons = () => {
        return (
            pages.map((page) => (
                <Button
                    key={`nav_button_${page.name}`}
                    component={Link} to={page.path}
                    sx={{ color: 'white', display: 'block' }}
                >
                    {page.name}
                </Button>
            ))
        )
    }

    const renderMobileMenu = () => {
        return (
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <IconButton
                    onClick={handleOpenNavMenu}
                    sx={{ color: 'white', display: 'block' }}
                >
                    <MenuIcon />
                </IconButton>
                {anchorElNav && renderButtons()}
            </Box>
        )
    }

    const renderNormalMenu = () => {
        return (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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