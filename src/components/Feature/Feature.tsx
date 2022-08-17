import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MovieProps } from '../../typings';
import Button from '@mui/material/Button';

interface MainFeaturedProps {
    movie: MovieProps | null;
}

function Feature({ movie }: MainFeaturedProps) {
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                    movie?.backdrop_path || movie?.poster_path
                })`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{ display: 'none' }}
                    src={movie?.backdrop_path}
                    alt={movie?.name}
                />
            }
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            {movie?.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {movie?.overview}
                        </Typography>
                        <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Read more
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Feature;
