import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { moviesState } from '../atoms/moviesAtom';
import { endpoints, getAllMovies } from '../services/api';
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

        getAllMovies(endpoints.UPCOMING())
            .then((result) => {
                setMovie(
                    result.results[
                        Math.floor(Math.random() * result.results.length)
                    ]
                );
            })
            .catch((error: any) => {
                console.log(error.message);
            });
    }, [movies]);

    return movie;
};

export default useFetchRandomMovie;
