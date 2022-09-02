import { useState, useEffect, ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { notificationAtom } from '../../atoms/notificationAtom';
import { useNavigate, Link } from 'react-router-dom';
import * as showService from '../../services/show';
import { IShow } from '../../interfaces/show';
import { IError } from '../../interfaces/error';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Spinner from '../common/Spinner';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function TvShows() {
    const [shows, setShows] = useState<IShow[]>([]);
    const [selectedCategory, setSelectedCategory] =
        useState<string>('airingToday');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const setNotify = useSetRecoilState(notificationAtom);
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
        setShows([]);
    };

    const handleChangePage = () => setCurrentPage(currentPage + 1);

    useEffect(() => {
        if (currentPage === 1) {
            setIsLoading(true);
        }

        showService
            .getByCategory(selectedCategory, currentPage)
            .then((result: IShow[]) => {
                if (currentPage === 1) {
                    setShows(result);
                    setIsLoading(false);
                } else {
                    setShows((state) => [...state, ...result]);
                }
            })
            .catch((error: IError) => {
                setNotify((state) => ({
                    ...state,
                    show: true,
                    msg: error.status_message,
                    type: 'error',
                }));
                navigate('/');
            });
    }, [selectedCategory, currentPage, navigate, setNotify]);

    return (
        <>
            <FormControl style={{ paddingBottom: '10px' }}>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="airingToday"
                        label="TV Airing Today"
                        control={<Radio />}
                        checked={selectedCategory === 'airingToday'}
                    />
                    <FormControlLabel
                        value="onTheAir"
                        control={<Radio />}
                        label="TV On The Air"
                        checked={selectedCategory === 'onTheAir'}
                    />
                    <FormControlLabel
                        value="popular"
                        control={<Radio />}
                        label="Popular"
                        checked={selectedCategory === 'popular'}
                    />
                    <FormControlLabel
                        value="topRated"
                        control={<Radio />}
                        label="Top Rated"
                        checked={selectedCategory === 'topRated'}
                    />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
                {isLoading && <Spinner />}
                {!isLoading &&
                    shows.map((show: IShow) => (
                        <Grid item xs={4} key={show.id}>
                            <Card
                                sx={{ maxWidth: 345, textDecoration: 'none' }}
                                component={Link}
                                to={`/tv/${show.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        loading="lazy"
                                        height="140"
                                        image={`https://image.tmdb.org/t/p/original${
                                            show.backdrop_path ||
                                            show.poster_path
                                        }`}
                                        alt="movie poster"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {show.name || show.original_name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <Box textAlign="center" style={{ paddingTop: '15px' }}>
                <Button variant="contained" onClick={handleChangePage}>
                    Load more
                </Button>
            </Box>
        </>
    );
}

export default TvShows;
