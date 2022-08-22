import { useState, useEffect } from 'react';
import { useUserAuth } from '../../contexts/AuthContext';
import { MovieInfoProps } from '../../typings';

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
    const [myLikes, setMyLikes] = useState<MovieInfoProps[]>([]);
    const [myList, setMyList] = useState<MovieInfoProps[]>([]);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            console.log(doc.data()?.savedShows);
            if (doc.data()?.savedShows !== undefined) {
                setMyLikes(doc.data()?.savedShows);
            }

            if (doc.data()?.myList !== undefined) {
                setMyList(doc.data()?.myList);
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
                        My List
                    </Typography>
                    {myLikes.length > 0 ? (
                        <Row movies={myList} />
                    ) : (
                        <Typography variant="body2" component="p">
                            You don't have any added movies into your list.
                        </Typography>
                    )}
                    <Typography variant="body1" component="p">
                        My Likes
                    </Typography>
                    {myLikes.length > 0 ? (
                        <Row movies={myLikes} />
                    ) : (
                        <Typography variant="body2" component="p">
                            No don't have any liked movies yet.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Account;
