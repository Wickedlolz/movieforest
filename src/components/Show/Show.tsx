import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import { getTvShowById, getShowReviewsById } from '../../services/api';
import ReactPlayer from 'react-player/lazy';
import { db } from '../../firebase.config';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { showState } from '../../atoms/showAtom';
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function Show() {
    const { tvId } = useParams();
    const { user } = useUserAuth();
    const [show, setShow] = useRecoilState(showState);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    const [notify, setNotify] = useRecoilState(notificationAtom);
    const userRef = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        if (show.info?.id.toString() === tvId) return;

        setIsLoading(true);
        async function fetchShowDetailedInfo() {
            try {
                const showInfo = await getTvShowById(tvId!);
                const showReviewsResult = await getShowReviewsById(tvId!);

                const index = showInfo.videos.results.findIndex(
                    (element: any) => element.type === 'Trailer'
                );

                setShow((state) => ({
                    ...state,
                    info: {
                        ...showInfo,
                        videos: showInfo.videos.results[index],
                    },
                    reviews: showReviewsResult.results,
                }));

                setIsLoading(false);
            } catch (error: any) {
                console.log(error);
            }
        }

        fetchShowDetailedInfo();
    }, [tvId, setShow, show.info?.id]);

    const handleLike = () => {};

    const handleDislike = () => {};

    const handleAddToWatchlist = () => {};

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify((state) => ({ ...state, show: false, msg: '' }));
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
                    image={`https://image.tmdb.org/t/p/original/${show.info?.backdrop_path}`}
                    alt="movie poster"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {show.info?.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <Chip
                            label={`${
                                show.info ? show.info.vote_average * 10 : 0
                            }% Match`}
                        />{' '}
                        <Chip label="HD" />{' '}
                        <Chip
                            label={show.info?.original_language.toLocaleUpperCase()}
                        />{' '}
                        <Chip
                            variant="outlined"
                            label={show.info?.first_air_date}
                        />{' '}
                        <Chip
                            variant="outlined"
                            label={show.info?.genres
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
                        {show.info?.overview}
                    </Typography>
                    <Divider />
                    <Typography variant="h6" component="h6">
                        Media
                    </Typography>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${show.info?.videos.key}`}
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
                    <Credits tvId={tvId} />
                    <Divider />
                    <Typography variant="h6" component="h6">
                        Reviews
                    </Typography>
                    {show.reviews && show.reviews!.length > 0 ? (
                        show.reviews!.map((review: any) => (
                            <Review key={review.id} review={review} />
                        ))
                    ) : (
                        <Typography variant="body2">
                            We don't have any reviews for {show.info?.name}.
                        </Typography>
                    )}
                    <Divider />
                    <Typography variant="h6" color="h6">
                        Recommendations
                    </Typography>
                    <Recommendations tvId={tvId} title={show.info?.name} />
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

export default Show;
