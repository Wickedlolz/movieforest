import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import { getMovieDetailedInfo, getMovieReviewsById } from '../../services/api';
import ReactPlayer from 'react-player/lazy';
import { db } from '../../firebase.config';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { MovieInfoProps } from '../../typings';
import { useRecoilState } from 'recoil';
import { movieState } from '../../atoms/movieAtom';
import { notificationAtom } from '../../atoms/notificationAtom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Spinner from '../common/Spinner';
import Recommendations from '../Recommendations/Recommendations';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Credits from '../Credits/Credits';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Review from '../Review/Review';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Movie() {
    const { movieId } = useParams();
    const { user } = useUserAuth();
    const [movie, setMovie] = useRecoilState(movieState);
    const [savedMovies, setSavedMovies] = useState<MovieInfoProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [notify, setNotify] = useRecoilState(notificationAtom);

    useEffect(() => {
        if (movie.movieInfo?.id === movieId) return;
        setLoading(true);

        getMovieDetailedInfo(movieId!)
            .then(([movieInfo, movieVideos]) => {
                const index = movieVideos.results.findIndex(
                    (element: any) => element.type === 'Trailer'
                );
                setMovie((state) => ({
                    ...state,
                    movieInfo,
                    movieVideos: movieVideos.results[index],
                }));
                setLoading(false);
            })
            .catch((error: any) =>
                setNotify((state) => ({
                    ...state,
                    show: true,
                    msg: error.message,
                }))
            );
    }, [movieId, setNotify, setMovie, movie.movieInfo?.id]);

    useEffect(() => {
        if (movie.movieInfo?.id === movieId) return;
        getMovieReviewsById(movieId!)
            .then((result) => {
                setMovie((state) => ({
                    ...state,
                    movieReviews: result.results,
                }));
            })
            .catch((error: any) =>
                setNotify((state) => ({
                    ...state,
                    show: true,
                    msg: error.message,
                }))
            );
    }, [movieId, setNotify, setMovie, movie.movieInfo?.id]);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            const liked: boolean = doc
                .data()
                ?.savedShows.find((x: any) => x.id === movie.movieInfo?.id);
            setSavedMovies(doc.data()?.savedShows);

            if (liked) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        });
    }, [user, movie]);

    const handleLike = async () => {
        try {
            const userRef = doc(db, 'users', `${user?.email}`);
            await updateDoc(userRef, {
                savedShows: arrayUnion(movie.movieInfo),
            });
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: error.message,
            }));
        }
    };

    const handleDislike = async () => {
        const userRef = doc(db, 'users', `${user?.email}`);
        const result = savedMovies.filter(
            (x: any) => x.id.toString() !== movieId
        );

        await updateDoc(userRef, {
            savedShows: result,
        });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify((state) => ({ ...state, show: false, msg: '' }));
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Card>
                <CardMedia
                    component="img"
                    height="340"
                    image={`https://image.tmdb.org/t/p/original/${movie.movieInfo?.backdrop_path}`}
                    alt="movie poster"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.movieInfo?.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <Chip
                            label={`${
                                movie.movieInfo!.vote_average * 10
                            }% Match`}
                        />{' '}
                        <Chip label="HD" />{' '}
                        <Chip
                            label={movie.movieInfo?.original_language.toLocaleUpperCase()}
                        />{' '}
                        <Chip
                            variant="outlined"
                            label={movie.movieInfo?.release_date}
                        />{' '}
                        <Chip
                            variant="outlined"
                            label={movie.movieInfo?.genres
                                .map((x: any) => x.name)
                                .join(', ')}
                        />
                    </Typography>
                    {user && (
                        <Typography gutterBottom variant="h5" component="div">
                            <IconButton aria-label="add to list">
                                <FormatListBulletedOutlinedIcon />
                            </IconButton>
                            {isLiked ? (
                                <IconButton
                                    aria-label="unmark as favourite"
                                    onClick={handleDislike}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="mark as favourite"
                                    onClick={handleLike}
                                >
                                    <FavoriteBorderOutlinedIcon />
                                </IconButton>
                            )}
                            <IconButton aria-label="add to your watchlist">
                                <BookmarkBorderOutlinedIcon />
                            </IconButton>
                            <IconButton aria-label="rate it">
                                <StarBorderOutlinedIcon />
                            </IconButton>
                        </Typography>
                    )}
                    <Typography gutterBottom variant="h6" component="h6">
                        Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.movieInfo?.overview}
                    </Typography>
                    <Divider />
                    <Typography variant="h6" component="h6">
                        Media
                    </Typography>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${movie?.movieVideos.key}`}
                        playing
                        width="100%"
                        controls
                        style={{ padding: '2px' }}
                        muted={true}
                    />
                    <Divider />
                    <Typography variant="h6" component="h6">
                        Top Billed Cast
                    </Typography>
                    <Credits movieId={movieId} />
                    <Divider />
                    <Typography variant="h6" component="h6">
                        Reviews
                    </Typography>
                    {movie.movieReviews!.length > 0 ? (
                        movie.movieReviews!.map((review: any) => (
                            <Review key={review.id} review={review} />
                        ))
                    ) : (
                        <Typography variant="body2">
                            We don't have any reviews for{' '}
                            {movie.movieInfo?.title}.
                        </Typography>
                    )}
                    <Divider />
                    <Typography variant="h6" color="h6">
                        Recommendations
                    </Typography>
                    <Recommendations
                        movieId={movieId}
                        movieTitle={movie.movieInfo?.title}
                    />
                </CardContent>
            </Card>
            <Snackbar
                open={notify.show}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {notify.msg}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Movie;
