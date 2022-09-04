import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import * as movieService from '../../services/movie';
import ReactPlayer from 'react-player/lazy';
import { db } from '../../firebase.config';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { IMovieInfo } from '../../interfaces/movie';
import { useRecoilState, useSetRecoilState } from 'recoil';
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
import Credits from '../Credits/Credits';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Review from '../Review/Review';
import Tooltip from '@mui/material/Tooltip';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function Movie() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const { user } = useUserAuth();
    const [movie, setMovie] = useRecoilState(movieState);
    const [savedMovies, setSavedMovies] = useState<IMovieInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    const setNotify = useSetRecoilState(notificationAtom);
    const userRef = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        if (movie.info?.id.toString() === movieId) return;
        setIsLoading(true);

        async function fetchMovieDetailedInfo(): Promise<void> {
            try {
                const [movieInfo, movieVideos] =
                    await movieService.getMovieDetailedInfo(movieId!);
                const movieReviewsResult =
                    await movieService.getMovieReviewsById(movieId!);

                const index = movieVideos.findIndex(
                    (element: any) => element.type === 'Trailer'
                );
                setMovie((state) => ({
                    ...state,
                    info: movieInfo,
                    video: movieVideos[index],
                    reviews: movieReviewsResult.results,
                }));

                setIsLoading(false);
            } catch (error: any) {
                setNotify((state) => ({
                    ...state,
                    show: true,
                    msg: error.message,
                    type: 'error',
                }));
                navigate('/', { replace: true });
            }
        }

        fetchMovieDetailedInfo();
    }, [movieId, setNotify, setMovie, movie.info?.id, navigate]);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            const liked: boolean = doc
                .data()
                ?.savedMovies.find((x: any) => x.id === movie.info?.id);
            setSavedMovies(doc.data()?.savedMovies);

            const isInMyWatchlist: boolean = doc
                .data()
                ?.watchList.find((x: any) => x.id === movie.info?.id);

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
        });
    }, [user, movie]);

    const handleLike = async () => {
        try {
            await updateDoc(userRef, {
                savedMovies: arrayUnion(movie.info),
            });

            setNotify((state) => ({
                ...state,
                show: true,
                msg: `Successfully liked ${movie.info?.title}`,
                type: 'success',
            }));
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: 'Something went wrong, try again later.',
                type: 'error',
            }));
        }
    };

    const handleDislike = async () => {
        try {
            const result = savedMovies.filter(
                (x: any) => x.id.toString() !== movieId
            );

            await updateDoc(userRef, {
                savedMovies: result,
            });

            setNotify((state) => ({
                ...state,
                show: true,
                msg: `Successfully unlike ${movie.info?.title}`,
                type: 'success',
            }));
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: `Something went wrong, try again later.`,
                type: 'error',
            }));
        }
    };

    const handleAddToWatchlist = async () => {
        try {
            await updateDoc(userRef, {
                watchList: arrayUnion(movie.info),
            });

            setNotify((state) => ({
                ...state,
                show: true,
                msg: `Successfully added ${movie.info?.title} to my Watch List.`,
                type: 'success',
            }));
        } catch (error: any) {
            setNotify((state) => ({
                ...state,
                show: true,
                msg: error.message,
                type: 'error',
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
                    image={`https://image.tmdb.org/t/p/original/${movie.info?.backdrop_path}`}
                    alt="movie poster"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.info?.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <Chip
                            label={`${
                                movie.info ? movie.info.vote_average * 10 : 0
                            }% Match`}
                        />{' '}
                        <Chip label="HD" />{' '}
                        <Chip
                            label={movie.info?.original_language.toLocaleUpperCase()}
                        />{' '}
                        <Chip
                            variant="outlined"
                            label={movie.info?.release_date}
                        />{' '}
                        <Chip
                            variant="outlined"
                            label={movie.info?.genres
                                .map((x: any) => x.name)
                                .join(', ')}
                        />
                    </Typography>
                    {user && (
                        <Typography gutterBottom variant="h5" component="div">
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
                        {movie.info?.overview}
                    </Typography>
                    <Divider />
                    <Typography variant="h6" component="h6">
                        Media
                    </Typography>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${movie.video?.key}`}
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
                    {movie.reviews && movie.reviews!.length > 0 ? (
                        movie.reviews!.map((review: any) => (
                            <Review key={review.id} review={review} />
                        ))
                    ) : (
                        <Typography variant="body2">
                            We don't have any reviews for {movie.info?.title}.
                        </Typography>
                    )}
                    <Divider />
                    <Typography variant="h6" color="h6">
                        Recommendations
                    </Typography>
                    <Recommendations
                        movieId={movieId}
                        title={movie.info?.title}
                    />
                </CardContent>
            </Card>
        </>
    );
}

export default Movie;
