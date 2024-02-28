import * as React from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';

export const pages = [
    {
        title: 'Nyumbani',
        link: '/'
    },
    {
        title: 'Kuhusu Pugu Marathon',
        link: '/'
    },
    {
        title: 'Mawasiliano',
        link: '/'
    }
];

function TopNav() {
    const navigate = useNavigate();
    const router = useLocation();
    const { pathname } = router;
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="sticky"
            style={{
                backgroundColor: "#1c4571"
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: "center" }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                ml: 2
                            }}
                        >
                            PUGU MARATHON
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.title}
                                    onClick={() => {
                                        handleCloseNavMenu()
                                        navigate(page.link)
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        color={pathname === page.link && "primary"}
                                    >
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.0.5rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            ml: 2
                        }}
                    >
                        PUGU MARATHON
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 0.3,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => {
                                    handleCloseNavMenu()
                                    navigate(page.link)
                                }}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    ...(pathname === page.link && {
                                        color: 'gray'
                                    })
                                }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default TopNav;