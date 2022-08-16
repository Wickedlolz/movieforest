import useFetchRandomMovie from '../../hooks/useFetchRandomMovie';
import { endpoints } from '../../services/api';
import Feature from '../Feature/Feature';
import Typography from '@mui/material/Typography';
import Row from '../Row/Row';

function Main() {
    const movie = useFetchRandomMovie();

    return (
        <>
            <Feature movie={movie} />
            <Typography variant="body1" component="p">
                Upcoming
            </Typography>
            <Row fetchUrl={endpoints.UPCOMING} />
            <Typography variant="body1" component="p">
                Now Playing
            </Typography>
            <Row fetchUrl={endpoints.NOW_PLAYING} />
            <Typography variant="body1" component="p">
                Popular
            </Typography>
            <Row fetchUrl={endpoints.POPULAR} />
            <Typography variant="body1" component="p">
                Top Rated
            </Typography>
            <Row fetchUrl={endpoints.TOP_RATED} />
        </>
    );
}

export default Main;
