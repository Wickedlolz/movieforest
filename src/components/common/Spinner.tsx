import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
    return (
        <Box>
            <CircularProgress style={{ display: 'block', margin: 'auto' }} />
        </Box>
    );
}

export default Spinner;
