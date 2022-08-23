import { atom } from 'recoil';
import {
    MovieInfoProps,
    MovieVideoProps,
    MovieReviewsProps,
} from '../interfaces/movie';

interface MovieStateProps {
    info: MovieInfoProps | null;
    video: MovieVideoProps | null;
    reviews: MovieReviewsProps[] | null;
}

const initialState = {
    info: null,
    video: null,
    reviews: null,
};

export const movieState = atom<MovieStateProps>({
    key: 'movieState',
    default: initialState,
});
