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
import Credits from '../Credits/Credits';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Review from '../Review/Review';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import GradingIcon from '@mui/icons-material/Grading';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function Movie() {
    const { movieId } = useParams();
    const { user } = useUserAuth();
    const [movie, setMovie] = useRecoilState(movieState);
    const [savedMovies, setSavedMovies] = useState<MovieInfoProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);
    const [notify, setNotify] = useRecoilState(notificationAtom);
    const userRef = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        if (movie.movieInfo?.id.toString() === movieId) return;
        setIsLoading(true);

        async function fetchMovieDetailedInfo() {
            try {
                const [movieInfo, movieVideos] = await getMovieDetailedInfo(
                    movieId!
                );
                const movieReviewsResult = await getMovieReviewsById(movieId!);

                const index = movieVideos.results.findIndex(
                    (element: any) => element.type === 'Trailer'
                );
                setMovie((state) => ({
                    ...state,
                    movieInfo,
                    movieVideos: movieVideos.results[index],
                    movieReviews: movieReviewsResult.results,
                }));

                setIsLoading(false);
            } catch (error: any) {
                setNotify((state) => ({
                    ...state,
                    show: true,
                    msg: error.message,
                }));
            }
        }

        fetchMovieDetailedInfo();
    }, [movieId, setNotify, setMovie, movie.movieInfo?.id]);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            const liked: boolean = doc
                .data()
                ?.savedShows.find((x: any) => x.id === movie.movieInfo?.id);
            setSavedMovies(doc.data()?.savedShows);

            const isInMyWatchlist: boolean = doc
                .data()
                ?.watchList.find((x: any) => x.id === movie.movieInfo?.id);
            const isInMyList: boolean = doc
                .data()
                ?.myList.find((x: any) => x.id === movie.movieInfo?.id);

            if (liked) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }

            if (isInMyWatchlist) {
                setIsAddedToWatchlist(true);
            } else {
                setIsAddedToWatchlist(false);
            }

            if (isInMyList) {
                setIsAddedToMyList(true);
            } else {
                setIsAddedToMyList(false);
            }
        });
    }, [user, movie]);

    const handleLike = async () => {
        try {
            await updateDoc(userRef, {
                savedShows: arrayUnion(movie.movieInfo),
            });

            setNotify((state) => ({
                ...state,
                show: true,
                msg: `Successfully liked ${movie.movieInfo?.title}`,
            }));
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: error.message,
            }));
        }
    };

    const handleDislike = async () => {
        const result = savedMovies.filter(
            (x: any) => x.id.toString() !== movieId
        );

        await updateDoc(userRef, {
            savedShows: result,
        });

        setNotify((state) => ({
            ...state,
            show: true,
            msg: `Successfully unlike ${movie.movieInfo?.title}`,
        }));
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

    const handleAddToWatchlist = async () => {
        try {
            await updateDoc(userRef, {
                watchList: arrayUnion(movie.movieInfo),
            });

            setNotify((state) => ({
                ...state,
                show: true,
                msg: `Successfully added ${movie.movieInfo?.title} to my Watch List.`,
            }));
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: error.message,
            }));
        }
    };

    const handleAddToMyList = async () => {
        try {
            await updateDoc(userRef, {
                myList: arrayUnion(movie.movieInfo),
            });

            setNotify((state) => ({
                ...state,
                show: true,
                msg: `Successfully added ${movie.movieInfo?.title} to My List.`,
            }));
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: error.message,
            }));
        }
    };

    if (isLoading) {
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
                                movie.movieInfo
                                    ? movie.movieInfo.vote_average * 10
                                    : 0
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
                            {isAddedToMyList ? (
                                <Tooltip title="remove from my list">
                                    <IconButton aria-label="remove from my list">
                                        <GradingIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Add to my list">
                                    <IconButton
                                        aria-label="add to my list"
                                        onClick={handleAddToMyList}
                                    >
                                        <FormatListBulletedOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {isLiked ? (
                                <Tooltip title="Dislike">
                                    <IconButton
                                        aria-label="dislike"
                                        onClick={handleDislike}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Like">
                                    <IconButton
                                        aria-label="like"
                                        onClick={handleLike}
                                    >
                                        <FavoriteBorderOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {isAddedToWatchlist ? (
                                <Tooltip title="remove from your watchlist">
                                    <IconButton aria-label="remove from your watchlist">
                                        <BookmarkAddedIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Add to your watchlist">
                                    <IconButton
                                        aria-label="add to your watchlist"
                                        onClick={handleAddToWatchlist}
                                    >
                                        <BookmarkBorderOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
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
                        url={`https://www.youtube.com/watch?v=${movie.movieVideos?.key}`}
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
                    {movie.movieReviews && movie.movieReviews!.length > 0 ? (
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
