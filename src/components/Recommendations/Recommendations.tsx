import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { movieState } from '../../atoms/movieAtom';
import { showState } from '../../atoms/showAtom';
import { request, endpoints } from '../../services/api';
import Typography from '@mui/material/Typography';
import Row from '../Row/Row';

interface RecommendationsProps {
    movieId?: string | undefined;
    tvId?: string | undefined;
    title: string | undefined;
}

function Recommendations({ movieId, tvId, title }: RecommendationsProps) {
    const [movie, setMovie] = useRecoilState(movieState);
    const [show, setShow] = useRecoilState(showState);

    useEffect(() => {
        if (movieId && movieId !== movie.info?.id.toString()) {
            request(endpoints.GET_RECOMMENDATIONS_BY_ID(movieId!))
                .then((result) => {
                    setMovie((state) => ({
                        ...state,
                        recommendations: result.results,
                    }));
                })
                .catch((error: any) => {
                    console.log(error.message);
                });
        }

        if (tvId && tvId !== show.info?.id.toString()) {
            request(endpoints.GET_SHOW_RECOMENDATIONS_BY_ID(tvId!))
                .then((result) => {
                    setShow((state) => ({
                        ...state,
                        recommendations: result.results,
                    }));
                })
                .catch((error: any) => {
                    console.log(error.message);
                });
        }
    }, [movieId, tvId, movie.info?.id, show.info?.id, setMovie, setShow]);

    return (
        <Typography component="div">
            {(movieId ? movie.recommendations : show.recommendations).length >
            0 ? (
                <Row
                    movies={
                        movieId ? movie.recommendations : show.recommendations
                    }
                />
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
