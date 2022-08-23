import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';

function Review({ review }: any) {
    return (
        <Typography gutterBottom variant="h5" component="div">
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        A review by {review?.author}{' '}
                        <Chip
                            label={`${review?.author_details.rating || 0}`}
                            icon={<StarIcon />}
                        />
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        Written by {review?.author} on{' '}
                        {new Date(review?.created_at).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">{review?.content}</Typography>
                </CardContent>
            </Card>
        </Typography>
    );
}

export default Review;
