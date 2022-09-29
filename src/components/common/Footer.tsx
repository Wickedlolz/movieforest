import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bottom: 0,
                py: 3,
                px: 2,
                mt: '20px',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[900],
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="body1"
                    sx={{
                        color: '#55565C',
                        marginBottom: '5px',
                        textAlign: 'center',
                    }}
                >
                    This product uses the TMDB API but is not endorsed or
                    certified by TMDB.
                </Typography>
                <a
                    href="https://developers.themoviedb.org/3/getting-started/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        style={{ display: 'block', margin: '0 auto' }}
                        width={150}
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt="The Movie Database"
                        loading="lazy"
                    />
                </a>
            </Container>
        </Box>
    );
}

export default Footer;
