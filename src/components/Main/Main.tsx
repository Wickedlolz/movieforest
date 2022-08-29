import { useEffect, useState } from 'react';
import { useUserAuth } from '../../contexts/AuthContext';
import useFetchRandomMovie from '../../hooks/useFetchRandomMovie';
import { endpoints, requestByCategory } from '../../services/api';
import { useRecoilState } from 'recoil';
import { moviesState } from '../../atoms/moviesAtom';
import { IMovieInfo } from '../../interfaces/movie';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.config';

import Feature from '../Feature/Feature';
import Typography from '@mui/material/Typography';
import Row from '../Row/Row';
import Spinner from '../common/Spinner';
import ShowsRow from '../ShowsRow/ShowsRow';

function Main() {
    const randomMovie = useFetchRandomMovie();
    const { user } = useUserAuth();
    const [movies, setMovies] = useRecoilState(moviesState);
    const [watchList, setWatchList] = useState<IMovieInfo[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (movies) return;

        async function fetchAllCategories() {
            setLoading(true);
            const [nowPlaying, popular, topRated, upcoming, shows] =
                await Promise.all([
                    requestByCategory(endpoints.NOW_PLAYING),
                    requestByCategory(endpoints.POPULAR),
                    requestByCategory(endpoints.TOP_RATED),
                    requestByCategory(endpoints.UPCOMING()),
                    requestByCategory(endpoints.GET_SHOWS_ON_AIR),
                ]);

            setMovies({
                nowPlaying,
                popular,
                topRated,
                upcoming,
                showsOnAir: shows,
            });
            setLoading(false);
        }

        fetchAllCategories();
    }, [setMovies, movies]);

    useEffect(() => {
        if (user?.email) {
            onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
                setWatchList(doc.data()?.watchList);
            });
        }
    }, [user?.email]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Feature movie={randomMovie} />

            <Typography variant="body1" component="p">
                Upcoming
            </Typography>
            <Row movies={movies?.upcoming} />
            <Typography variant="body1" component="p">
                Shows On Air
            </Typography>
            <ShowsRow shows={movies?.showsOnAir} />
            <Typography variant="body1" component="p">
                Now Playing
            </Typography>
            <Row movies={movies?.nowPlaying} />
            {watchList.length > 0 && (
                <>
                    <Typography variant="body1" component="p">
                        My Watch List
                    </Typography>
                    <Row movies={watchList} />
                </>
            )}
            <Typography variant="body1" component="p">
                Popular
            </Typography>
            <Row movies={movies?.popular} />
            <Typography variant="body1" component="p">
                Top Rated
            </Typography>
            <Row movies={movies?.topRated} />
        </>
    );
}

export default Main;
