import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetailedInfo } from '../../services/api';
import ReactPlayer from 'react-player';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Spinner from '../common/Spinner';
import { MovieInfoProps } from '../../typings';
import Recommendations from '../Recommendations/Recommendations';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Credits from '../Credits/Credits';

function Movie() {
    const { movieId } = useParams();
    const [movieInfo, setMovieInfo] = useState<MovieInfoProps | null>(null);
    const [movieVideos, setMovieVideos] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovieDetailedInfo(movieId!).then(([movieInfo, movieVideos]) => {
            const index = movieVideos.results.findIndex(
                (element: any) => element.type === 'Trailer'
            );
            setMovieInfo(movieInfo!);
            setMovieVideos(movieVideos.results[index]);
            setLoading(false);
        });
    }, [movieId]);

    console.log(movieInfo);

    if (loading) {
        return <Spinner />;
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height="340"
                image={`https://image.tmdb.org/t/p/original/${movieInfo?.backdrop_path}`}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {movieInfo?.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <Chip label={`${movieInfo!.vote_average * 10}% Match`} />{' '}
                    <Chip label="HD" />{' '}
                    <Chip
                        label={movieInfo?.original_language.toLocaleUpperCase()}
                    />{' '}
                    <Chip variant="outlined" label={movieInfo?.release_date} />{' '}
                    <Chip
                        variant="outlined"
                        label={movieInfo?.genres
                            .map((x: any) => x.name)
                            .join(', ')}
                    />
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <IconButton aria-label="add to list">
                        <FormatListBulletedOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="mark as favourite">
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="add to your watchlist">
                        <BookmarkBorderOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="rate it">
                        <StarBorderOutlinedIcon />
                    </IconButton>
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movieInfo?.overview}
                </Typography>
                <Divider />
                <Typography variant="h6" component="h6">
                    Media
                </Typography>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${movieVideos?.key}`}
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
                <Typography variant="h6" color="text.secondary">
                    Recommendations
                </Typography>
                <Recommendations
                    movieId={movieId}
                    movieTitle={movieInfo?.title}
                />
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
            </CardActions>
        </Card>
    );
}

export default Movie;
