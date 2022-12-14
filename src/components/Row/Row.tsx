import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IMovie, IMovieInfo } from '../../interfaces/movie';
import Spinner from '../common/Spinner';

interface RowProps {
    movies: IMovie[] | IMovieInfo[];
}

function Row({ movies }: RowProps) {
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
            {!movies ? (
                <Spinner />
            ) : (
                movies.map((x) => (
                    <Grid container spacing={1} key={x.id}>
                        <Grid item xs={11}>
                            <Card
                                sx={{ maxWidth: 345, textDecoration: 'none' }}
                                component={Link}
                                to={`${
                                    x.episode_run_time || x.media_type === 'tv'
                                        ? '/tv/'
                                        : '/movie/'
                                }${x.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        loading="lazy"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/w500${
                                            x?.backdrop_path || x?.poster_path
                                        }`}
                                        alt="movie poster"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {x.title || x.name}
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

export default Row;
