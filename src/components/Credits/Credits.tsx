import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { movieState } from '../../atoms/movieAtom';
import { showState } from '../../atoms/showAtom';
import * as movieService from '../../services/movie';
import * as showService from '../../services/show';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Spinner from '../common/Spinner';

interface CreditsProps {
    movieId?: string | undefined;
    tvId?: string | undefined;
}

function Credits({ movieId, tvId }: CreditsProps) {
    const [movie, setMovie] = useRecoilState(movieState);
    const [show, setShow] = useRecoilState(showState);

    useEffect(() => {
        if (movieId && movieId !== movie.info?.id.toString()) {
            movieService
                .getMovieCreditsById(movieId!)
                .then((result) => {
                    setMovie((state) => ({ ...state, credits: result }));
                })
                .catch((error: any) => console.log(error));
        }

        if (tvId && tvId !== show.info?.id.toString()) {
            showService
                .getShowCreditsById(tvId!)
                .then((result) => {
                    setShow((state) => ({ ...state, credits: result }));
                })
                .catch((error: any) => console.log(error));
        }
    }, [movieId, tvId, movie.info?.id, show.info?.id, setMovie, setShow]);

    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            centerMode={false}
            containerClass="container-with-dots"
            draggable
            focusOnSelect={false}
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover={true}
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024,
                    },
                    items: 4,
                    partialVisibilityGutter: 40,
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0,
                    },
                    items: 1,
                    partialVisibilityGutter: 30,
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            slidesToSlide={1}
            swipeable
        >
            {(movieId ? !movie.credits : !show.credits) ? (
                <Spinner />
            ) : (
                (movieId! ? movie.credits! : show.credits!).map((x) => (
                    <Grid container spacing={1} key={x.id}>
                        <Grid item xs={11}>
                            <Card
                                sx={{ maxWidth: 345, textDecoration: 'none' }}
                                component={Link}
                                to={`/people/person/${x.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/w500/${x?.profile_path}`}
                                        alt="actor image"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {x?.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                ))
            )}
        </Carousel>
    );
}

export default Credits;
