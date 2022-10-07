import { useState, MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import useLocalStorage from '../../hooks/useLocalStorage';

function Header() {
    const { user, logout } = useUserAuth();
    const [theme, setItem] = useLocalStorage('theme', 'dark');
    const navigate = useNavigate();
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const changeTheme = () => setItem(theme === 'light' ? 'dark' : 'light');

    const handleUserMenu = (event: MouseEvent<HTMLElement>) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserAnchorEl(null);
    };

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleSignOutClick = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await logout();
            navigate('/');
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Button component={Link} to="/" color="inherit">
                            MovieForest
                        </Button>
                    </Typography>
                    <Button color="inherit" onClick={changeTheme}>
                        {theme === 'light' ? (
                            <NightlightIcon />
                        ) : (
                            <WbSunnyIcon />
                        )}
                    </Button>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={menuAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(menuAnchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem
                                component={Link}
                                to="/search"
                                onClick={handleMenuClose}
                            >
                                <SearchIcon />
                                Search
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/movies"
                                onClick={handleMenuClose}
                            >
                                <MovieIcon />
                                Movies
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/tv"
                                onClick={handleMenuClose}
                            >
                                <TheatersIcon />
                                TV
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/people"
                                onClick={handleMenuClose}
                            >
                                <PeopleAltIcon />
                                People
                            </MenuItem>
                        </Menu>
                    </div>
                    {user ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleUserMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={userAnchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(userAnchorEl)}
                                onClose={handleUserMenuClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/account"
                                    onClick={handleUserMenuClose}
                                >
                                    <AccountBoxIcon />
                                    My account
                                </MenuItem>
                                <MenuItem onClick={handleSignOutClick}>
                                    <LogoutIcon />
                                    Sign Out
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleUserMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={userAnchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(userAnchorEl)}
                                onClose={handleUserMenuClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/signin"
                                    onClick={handleUserMenuClose}
                                >
                                    <LoginIcon />
                                    Sign In
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/signup"
                                    onClick={handleUserMenuClose}
                                >
                                    <AppRegistrationIcon />
                                    Sign Up
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
