import { useState, useEffect } from 'react';
import { endpoints, getAllMovies } from '../services/api';
import { MovieProps } from '../interfaces/movie';

const useFetchRandomMovie = (): MovieProps | null => {
    const [movie, setMovie] = useState<MovieProps | null>(null);

    useEffect(() => {
        getAllMovies(endpoints.UPCOMING)
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
    }, []);

    return movie;
};

export default useFetchRandomMovie;
