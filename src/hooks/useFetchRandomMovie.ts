import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { moviesState } from '../atoms/moviesAtom';
import * as movieService from '../services/movie';
import { IMovie } from '../interfaces/movie';

const useFetchRandomMovie = (): IMovie | null => {
    const movies = useRecoilValue(moviesState);
    const [movie, setMovie] = useState<IMovie | null>(null);

    useEffect(() => {
        if (movies) {
            setMovie(
                movies.upcoming[
                    Math.floor(Math.random() * movies.upcoming.length)
                ]
            );
            return;
        }

        movieService
            .getUpcomingMovies()
            .then((result) => {
                setMovie(result[Math.floor(Math.random() * result.length)]);
            })
            .catch((error: any) => console.log(error));
    }, [movies]);

    return movie;
};

export default useFetchRandomMovie;
