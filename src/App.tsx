import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { RecoilRoot } from 'recoil';

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

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    return (
        <RecoilRoot>
            <AuthContextProvider>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/movie/:movieId" element={<Movie />} />
                            <Route path="/people" element={<People />} />
                            <Route
                                path="/people/person/:personId"
                                element={<Person />}
                            />
                        </Routes>
                    </Container>
                </ThemeProvider>
            </AuthContextProvider>
        </RecoilRoot>
    );
}

export default App;
