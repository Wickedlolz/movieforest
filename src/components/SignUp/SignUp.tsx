import { useUserAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { notificationAtom } from '../../atoms/notificationAtom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

function SignUp() {
    const { signUp } = useUserAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const setNotify = useSetRecoilState(notificationAtom);

    const handleSignUpSubmit = async (data: any) => {
        try {
            await signUp(data.email, data.password);
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: error.message,
                type: 'error',
            }));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleSignUpSubmit)}
                    sx={{ mt: 1 }}
                >
                    {errors.email?.type === 'required' && (
                        <Alert severity="error">Email is required!</Alert>
                    )}

                    {errors.email?.type === 'pattern' && (
                        <Alert severity="error">Invalid email.</Alert>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        error={Boolean(errors.email)}
                        {...register('email', {
                            required: true,
                            pattern: /^[A-Za-z0-9]{2,}@[a-z]+\.[a-z]{2,3}$/,
                        })}
                    />
                    {errors.password?.type === 'required' && (
                        <Alert severity="error">Password is required!</Alert>
                    )}

                    {errors.password?.type === 'minLength' && (
                        <Alert severity="error">
                            Password must be atleast 3 characters long.
                        </Alert>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={Boolean(errors.password)}
                        {...register('password', {
                            required: true,
                            minLength: 3,
                        })}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <MuiLink
                                component={Link}
                                to="/signin"
                                variant="body2"
                            >
                                Have already an account? Sign In
                            </MuiLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUp;
