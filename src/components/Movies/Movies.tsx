import { useEffect, useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestByCategory, endpoints } from '../../services/api';
import { useSetRecoilState } from 'recoil';
import { notificationAtom } from '../../atoms/notificationAtom';
import { IMovie } from '../../interfaces/movie';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Spinner from '../common/Spinner';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Movies() {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [selectedCategory, setSelectedCategory] =
        useState<string>('upcoming');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const setNotify = useSetRecoilState(notificationAtom);
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleChangePage = () => setCurrentPage(currentPage + 1);

    useEffect(() => {
        const requests: any = {
            upcoming: endpoints.UPCOMING(currentPage),
            nowPlaying: endpoints.NOW_PLAYING,
            topRated: endpoints.TOP_RATED,
            popular: endpoints.POPULAR,
        };

        if (currentPage === 1) {
            setIsLoading(true);
        }

        requestByCategory(requests[selectedCategory])
            .then((result: IMovie[]) => {
                setMovies((state) => [...state, ...result]);
                if (currentPage === 1) {
                    setIsLoading(false);
                }
            })
            .catch((error: any) => {
                setNotify((state) => ({
                    ...state,
                    show: true,
                    msg: error.message,
                    type: 'error',
                }));
                navigate('/');
            });
    }, [selectedCategory, currentPage, navigate, setNotify]);

    return (
        <div>
            <FormControl style={{ paddingBottom: '10px' }}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="upcoming"
                        label="Upcoming"
                        control={<Radio />}
                        checked={selectedCategory === 'upcoming'}
                    />
                    <FormControlLabel
                        value="nowPlaying"
                        control={<Radio />}
                        label="Now Playing"
                        checked={selectedCategory === 'nowPlaying'}
                    />
                    <FormControlLabel
                        value="topRated"
                        control={<Radio />}
                        label="Top Rated"
                        checked={selectedCategory === 'topRated'}
                    />
                    <FormControlLabel
                        value="popular"
                        control={<Radio />}
                        label="Popular"
                        checked={selectedCategory === 'popular'}
                    />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
                {isLoading && <Spinner />}
                {!isLoading &&
                    movies.map((movie: IMovie) => (
                        <Grid item xs={4} key={movie.id}>
                            <Card
                                sx={{ maxWidth: 345, textDecoration: 'none' }}
                                component={Link}
                                to={`/movie/${movie.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/original${
                                            movie.backdrop_path ||
                                            movie.poster_path
                                        }`}
                                        alt="movie poster"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {movie.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <Box textAlign="center" style={{ paddingTop: '20px' }}>
                <Button variant="contained" onClick={handleChangePage}>
                    Load more
                </Button>
            </Box>
        </div>
    );
}

export default Movies;
