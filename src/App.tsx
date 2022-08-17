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

function App() {
    const theme = createTheme();

    return (
        <RecoilRoot>
            <AuthContextProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/movie/:movieId" element={<Movie />} />
                        </Routes>
                    </Container>
                </ThemeProvider>
            </AuthContextProvider>
        </RecoilRoot>
    );
}

export default App;
