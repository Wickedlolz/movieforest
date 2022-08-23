import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPersonById, getPersonMovieCredits } from '../../services/api';
import {
    PersonStateProps,
    PersonCastsStateProps,
} from '../../interfaces/person';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Spinner from '../common/Spinner';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Person() {
    const { personId } = useParams();
    const [person, setPerson] = useState<PersonStateProps | null>(null);
    const [personCasts, setPersonCasts] = useState<
        PersonCastsStateProps[] | null
    >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPersonById(personId!)
            .then((result) => {
                setPerson(result);
                setLoading(false);
            })
            .catch((error: any) => console.log(error.message));
    }, [personId]);

    useEffect(() => {
        getPersonMovieCredits(personId!)
            .then((result) => setPersonCasts(result))
            .catch((error: any) => console.log(error.message));
    }, [personId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height="640"
                image={`https://image.tmdb.org/t/p/original/${person?.profile_path}`}
                alt="actor"
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {person?.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    Biography
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {person?.biography}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    Known For Department
                    <Typography variant="body2" color="text.secondary">
                        {person?.known_for_department}
                    </Typography>
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    Birthday
                    <Typography variant="body2" color="text.secondary">
                        {person?.birthday}
                    </Typography>
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    Place of Birth
                    <Typography variant="body2" color="text.secondary">
                        {person?.place_of_birth}
                    </Typography>
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    Also Known As
                    <Typography variant="body2" color="text.secondary">
                        {person?.also_known_as.join(', ')}
                    </Typography>
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    Known For
                </Typography>
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
                    {!personCasts ? (
                        <Spinner />
                    ) : (
                        personCasts.map((x) => (
                            <Grid container spacing={1} key={x.id}>
                                <Grid item xs={11}>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            textDecoration: 'none',
                                        }}
                                        component={Link}
                                        to={`/movie/${x.id}`}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={`https://image.tmdb.org/t/p/original/${x?.backdrop_path}`}
                                                alt="movie poster"
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                    component="div"
                                                >
                                                    {x.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                        ))
                    )}
                </Carousel>
            </CardContent>
        </Card>
    );
}

export default Person;
