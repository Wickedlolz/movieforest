import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ISearch } from '../../interfaces/movie';
import * as movieService from '../../services/movie';
import * as showService from '../../services/show';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Spinner from '../common/Spinner';

function Search() {
    const [movies, setMovies] = useState<ISearch[] | null>(null);
    const [shows, setShows] = useState<ISearch[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmptyField, setIsEmptyField] = useState<boolean>(false);

    const handleOnSearch = async (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const searchQuery = formData.get('search');

        if (searchQuery === '') {
            setIsEmptyField(true);
            return;
        }

        setIsEmptyField(false);
        setIsLoading(true);
        try {
            const moviesResult = await movieService.search(
                searchQuery?.toString()!
            );
            const showsResult = await showService.search(
                searchQuery?.toString()!
            );

            setMovies(moviesResult);
            setShows(showsResult);
            setIsLoading(false);
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div>
            <FormControl
                style={{
                    paddingBottom: '15px',
                    paddingTop: '15px',
                    display: 'flex',
                }}
            >
                <form
                    onSubmit={handleOnSearch}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <TextField
                        label={'Search'}
                        name="search"
                        error={isEmptyField}
                    />

                    <Button
                        variant="outlined"
                        type="submit"
                        style={{ marginTop: '5px' }}
                    >
                        Search
                    </Button>
                </form>
            </FormControl>
            {movies && (
                <Typography
                    variant="h4"
                    component="h4"
                    sx={{ marginBottom: '5px' }}
                >
                    Movies
                </Typography>
            )}
            {movies?.length === 0 && (
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginBottom: '15px' }}
                >
                    No movies found
                </Typography>
            )}
            <Grid container spacing={2}>
                {isLoading && <Spinner />}
                {!isLoading &&
                    movies &&
                    movies.map((movie: ISearch) => (
                        <Grid item xs={4} key={movie.id}>
                            <Card
                                sx={{ maxWidth: 345, textDecoration: 'none' }}
                                component={Link}
                                to={`/movie/${movie.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        loading="lazy"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/w500${
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
            {shows && (
                <Typography
                    variant="h4"
                    component="h4"
                    sx={{ marginBottom: '5px' }}
                >
                    Shows
                </Typography>
            )}
            {shows?.length === 0 && (
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ marginBottom: '5px' }}
                >
                    No shows found
                </Typography>
            )}
            <Grid container spacing={2}>
                {shows &&
                    shows.map((show: ISearch) => (
                        <Grid item xs={4} key={show.id}>
                            <Card
                                sx={{ maxWidth: 345, textDecoration: 'none' }}
                                component={Link}
                                to={`/tv/${show.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        loading="lazy"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/w500${
                                            show.backdrop_path ||
                                            show.poster_path
                                        }`}
                                        alt="show poster"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {show.title || show.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}

export default Search;
