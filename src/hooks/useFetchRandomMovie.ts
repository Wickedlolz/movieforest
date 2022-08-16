import { useState, useEffect } from 'react';
import { endpoints, getAllMovies } from '../services/api';
import { Movie } from '../typings';

const useFetchRandomMovie = (): Movie | null => {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        getAllMovies(endpoints.UPCOMING)
            .then((result) => {
                console.log(result);
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
