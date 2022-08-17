import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { request, endpoints } from '../../services/api';
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
    movieId: string | undefined;
}

interface ActorsCredits {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

function Credits({ movieId }: CreditsProps) {
    const [credits, setCredits] = useState<ActorsCredits[] | null>(null);

    useEffect(() => {
        request(endpoints.GET_MOVIE_CREDITS(movieId!))
            .then((result) => {
                setCredits(result.cast);
            })
            .catch((error: any) => {
                console.log(error.message);
            });
    }, [movieId]);

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
            {!credits ? (
                <Spinner />
            ) : (
                credits.map((x) => (
                    <Grid container spacing={1} key={x.id}>
                        <Grid item xs={11}>
                            <Card
                                sx={{ maxWidth: 345, textDecoration: 'none' }}
                                component={Link}
                                to={`/person/${x.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/original/${x?.profile_path}`}
                                        alt="green iguana"
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
