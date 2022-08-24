import { useState, useEffect } from 'react';
import { request, endpoints } from '../../services/api';
import { MovieProps } from '../../interfaces/movie';
import Typography from '@mui/material/Typography';
import ShowsRow from '../ShowsRow/ShowsRow';

interface RecommendationsProps {
    movieId?: string | undefined;
    tvId?: string | undefined;
    title: string | undefined;
}

function Recommendations({ movieId, tvId, title }: RecommendationsProps) {
    const [recommendedMovies, setRecommendedMovies] = useState<MovieProps[]>(
        []
    );

    useEffect(() => {
        if (movieId) {
            request(endpoints.GET_RECOMMENDATIONS_BY_ID(movieId!))
                .then((result) => {
                    setRecommendedMovies(result.results);
                })
                .catch((error: any) => {
                    console.log(error.message);
                });
        }
        if (tvId) {
            request(endpoints.GET_SHOW_RECOMENDATIONS_BY_ID(tvId!))
                .then((result) => {
                    setRecommendedMovies(result.results);
                })
                .catch((error: any) => {
                    console.log(error.message);
                });
        }
    }, [movieId, tvId]);

    return (
        <Typography component="div">
            {recommendedMovies.length > 0 ? (
                <ShowsRow shows={recommendedMovies} />
            ) : (
                <Typography gutterBottom variant="subtitle1" component="p">
                    We don't have enough data to suggest any{' '}
                    {movieId ? 'movies' : 'shows'} based on {title}. You can
                    help by rating {movieId ? 'movies' : 'shows'} you've seen.
                </Typography>
            )}
        </Typography>
    );
}

export default Recommendations;
