import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { peopleState } from '../../atoms/peopleAtom';
import { Link } from 'react-router-dom';
import { request, endpoints } from '../../services/api';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Spinner from '../common/Spinner';

function People() {
    const [people, setPeople] = useRecoilState(peopleState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (people) return;
        setIsLoading(true);
        request(endpoints.POPULAR_ACTORS)
            .then((result: any) => {
                setPeople(result.results);
                setIsLoading(false);
            })
            .catch((error: any) => console.log(error.message));
    }, [people, setPeople]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Typography variant="h4" component="h4">
                Popular People
            </Typography>
            <Grid container spacing={2}>
                {people?.map((person: any) => (
                    <Grid item xs={4} key={person.id}>
                        <Card
                            sx={{ maxWidth: 345, textDecoration: 'none' }}
                            component={Link}
                            to={`/people/person/${person.id}`}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                                    alt="actor picure"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {person.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default People;
