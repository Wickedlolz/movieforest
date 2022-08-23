import { useState, useEffect } from 'react';
import { request, endpoints } from '../../services/api';
import { MovieProps } from '../../interfaces/movie';
import Row from '../Row/Row';
import Typography from '@mui/material/Typography';

interface RecommendationsProps {
    movieId: string | undefined;
    movieTitle: string | undefined;
}

function Recommendations({ movieId, movieTitle }: RecommendationsProps) {
    const [recommendedMovies, setRecommendedMovies] = useState<MovieProps[]>(
        []
    );

    useEffect(() => {
        request(endpoints.GET_RECOMMENDATIONS_BY_ID(movieId!))
            .then((result) => {
                setRecommendedMovies(result.results);
            })
            .catch((error: any) => {
                console.log(error.message);
            });
    }, [movieId]);

    return (
        <Typography component="div">
            {recommendedMovies.length > 0 ? (
                <Row movies={recommendedMovies} />
            ) : (
                <Typography gutterBottom variant="subtitle1" component="p">
                    We don't have enough data to suggest any movies based on{' '}
                    {movieTitle}. You can help by rating movies you've seen.
                </Typography>
            )}
        </Typography>
    );
}

export default Recommendations;
