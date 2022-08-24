import { useState, useEffect } from 'react';
import { useUserAuth } from '../../contexts/AuthContext';
import { MovieInfoProps } from '../../interfaces/movie';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.config';

import Row from '../Row/Row';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Account() {
    const { user } = useUserAuth();
    const [myLikedMovies, setMyLikedMovie] = useState<MovieInfoProps[]>([]);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            if (doc.data()?.savedMovies !== undefined) {
                setMyLikedMovie(doc.data()?.savedMovies);
            }
        });
    }, [user?.email]);

    return (
        <>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>User Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Email:{' '}
                        <Typography
                            sx={{ mb: 1.5 }}
                            component="span"
                            color="text.primary"
                        >
                            {user?.email}
                        </Typography>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>User Collections</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" component="p">
                        My Liked Movies
                    </Typography>
                    {myLikedMovies.length > 0 ? (
                        <Row movies={myLikedMovies} />
                    ) : (
                        <Typography variant="body2" component="p">
                            You don't have any liked movies yet.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Account;
