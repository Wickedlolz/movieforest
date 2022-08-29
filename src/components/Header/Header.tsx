import { useState, MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import { useRecoilState } from 'recoil';
import { themeState } from '../../atoms/themeAtom';

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

function Header() {
    const { user, logout } = useUserAuth();
    const [theme, setTheme] = useRecoilState(themeState);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const changeTheme = () =>
        setTheme((state) => (state === 'light' ? 'dark' : 'light'));

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                    {user ? (
                        <>
                            <Button
                                component={Link}
                                to="/movies"
                                color="inherit"
                            >
                                Movies
                            </Button>
                            <Button component={Link} to="/tv" color="inherit">
                                TV
                            </Button>
                            <Button
                                component={Link}
                                to="/people"
                                color="inherit"
                            >
                                People
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
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem
                                        component={Link}
                                        to="/account"
                                        onClick={handleClose}
                                    >
                                        My account
                                    </MenuItem>
                                    <MenuItem onClick={handleSignOutClick}>
                                        Sign Out
                                    </MenuItem>
                                </Menu>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/signin"
                                color="inherit"
                            >
                                Sign In
                            </Button>

                            <Button
                                component={Link}
                                to="/signup"
                                color="inherit"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
