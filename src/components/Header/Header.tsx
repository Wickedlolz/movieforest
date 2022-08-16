import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
    const { user, logout } = useUserAuth();
    const navigate = useNavigate();
    console.log(user);

    const handleSignInClick = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/signin');
    };

    const handleSignUpClick = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/signup');
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
                        MovieForest
                    </Typography>
                    {user ? (
                        <>
                            <Button color="inherit">Home</Button>
                            <Button
                                onClick={handleSignOutClick}
                                color="inherit"
                            >
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleSignInClick} color="inherit">
                                Sign In
                            </Button>
                            <Button onClick={handleSignUpClick} color="inherit">
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
