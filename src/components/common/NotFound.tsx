import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NotFound() {
    return (
        <>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                404
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                component="p"
            >
                The page you're looking for doesn't exist.
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                component="p"
                gutterBottom
            >
                <Button component={Link} to="/" variant="contained">
                    Back to home
                </Button>
            </Typography>
        </>
    );
}

export default NotFound;
