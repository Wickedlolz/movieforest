import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { useRecoilValue } from 'recoil';
import { themeState } from './atoms/themeAtom';

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

function App() {
    const theme = useRecoilValue(themeState);

    const lightTheme = createTheme();
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

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
                        <Route path="/account" element={<Account />} />
                        <Route path="/movie/:movieId" element={<Movie />} />
                        <Route path="/tv/:tvId" element={<Show />} />
                        <Route path="/people" element={<People />} />
                        <Route
                            path="/people/person/:personId"
                            element={<Person />}
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </AuthContextProvider>
    );
}

export default App;
