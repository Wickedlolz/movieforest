import { useEffect, useState } from 'react';
import useFetchRandomMovie from '../../hooks/useFetchRandomMovie';
import { endpoints, requestByCategory } from '../../services/api';
import { useRecoilState } from 'recoil';
import { moviesState } from '../../atoms/moviesAtom';

import Feature from '../Feature/Feature';
import Typography from '@mui/material/Typography';
import Row from '../Row/Row';
import Spinner from '../common/Spinner';

function Main() {
    const randomMovie = useFetchRandomMovie();
    const [movies, setMovies] = useRecoilState(moviesState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (movies) return;

        async function fetchAllCategories() {
            setLoading(true);
            const [nowPlaying, popular, topRated, upcoming] = await Promise.all(
                [
                    requestByCategory(endpoints.NOW_PLAYING),
                    requestByCategory(endpoints.POPULAR),
                    requestByCategory(endpoints.TOP_RATED),
                    requestByCategory(endpoints.UPCOMING),
                ]
            );

            setMovies({ nowPlaying, popular, topRated, upcoming });
            setLoading(false);
        }

        fetchAllCategories();
    }, [setMovies, movies]);

    return (
        <>
            <Feature movie={randomMovie} />
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Typography variant="body1" component="p">
                        Upcoming
                    </Typography>
                    <Row movies={movies?.upcoming} />
                    <Typography variant="body1" component="p">
                        Now Playing
                    </Typography>
                    <Row movies={movies?.nowPlaying} />
                    <Typography variant="body1" component="p">
                        Popular
                    </Typography>
                    <Row movies={movies?.popular} />
                    <Typography variant="body1" component="p">
                        Top Rated
                    </Typography>
                    <Row movies={movies?.topRated} />
                </>
            )}
        </>
    );
}

export default Main;
