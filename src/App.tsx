import { SyntheticEvent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { useRecoilValue, useRecoilState } from 'recoil';
import { themeState } from './atoms/themeAtom';
import { notificationAtom } from './atoms/notificationAtom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Movie from './components/Movie/Movie';
import People from './components/People/People';
import Person from './components/Person/Person';
import Account from './components/Account/Account';
import Show from './components/Show/Show';
import NotFound from './components/common/NotFound';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IsAuth from './components/common/IsAuth';

function App() {
    const theme = useRecoilValue(themeState);
    const [notify, setNotify] = useRecoilState(notificationAtom);

    const lightTheme = createTheme();
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify((state) => ({ ...state, show: false, msg: '' }));
    };

    return (
        <AuthContextProvider>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/movie/:movieId" element={<Movie />} />
                        <Route path="/tv/:tvId" element={<Show />} />
                        <Route path="/people" element={<People />} />
                        <Route
                            path="/people/person/:personId"
                            element={<Person />}
                        />
                        <Route element={<IsAuth />}>
                            <Route path="/account" element={<Account />} />
                        </Route>
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                    <Snackbar
                        open={notify.show}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        {notify.type === 'success' ? (
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                sx={{ width: '100%' }}
                            >
                                {notify.msg}
                            </Alert>
                        ) : (
                            <Alert
                                onClose={handleClose}
                                severity="error"
                                sx={{ width: '100%' }}
                            >
                                {notify.msg}
                            </Alert>
                        )}
                    </Snackbar>
                </Container>
            </ThemeProvider>
        </AuthContextProvider>
    );
}

export default App;
