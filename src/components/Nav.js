import { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';   

const Nav = () => {

    const [anchorElNav, setAnchorElNav] = useState(false);

    const pages = [
        {name: 'HOME', action: () => console.log("click home")},
        {name: 'Projects', action: () => console.log("click projects")},
        {name: 'Layers', action: () => console.log("click layers")},
        {name: 'Account', action: () => console.log("click account")}
    ]

    const handleOpenNavMenu = () => {
        setAnchorElNav(prev => !prev);
    }

    const renderButtons = () => {
        return (
            pages.map((page) => (
                <Button
                    key={`nav_button_${page.name}`}
                    onClick={page.action}
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