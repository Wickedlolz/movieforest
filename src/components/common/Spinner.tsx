import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

export default Spinner;
