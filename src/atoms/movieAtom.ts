import { atom } from 'recoil';
import { MovieInfoProps, MovieVideoProps, movieReviewsProps } from '../typings';

interface MovieStateProps {
    movieInfo: MovieInfoProps | null;
    movieVideos: MovieVideoProps | null;
    movieReviews: movieReviewsProps[] | null;
}

const initialState = {
    movieInfo: null,
    movieVideos: null,
    movieReviews: null,
};

export const movieState = atom<MovieStateProps>({
    key: 'movieState',
    default: initialState,
});
