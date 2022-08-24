import { atom } from 'recoil';
import {
    MovieInfoProps,
    MovieVideoProps,
    MovieReviewsProps,
} from '../interfaces/movie';
import { ActorsCredits } from '../interfaces/person';

interface IMovieState {
    info: MovieInfoProps | null;
    video: MovieVideoProps | null;
    reviews: MovieReviewsProps[] | null;
    credits: ActorsCredits[] | null;
}

const initialState = {
    info: null,
    video: null,
    reviews: null,
    credits: null,
};

export const movieState = atom<IMovieState>({
    key: 'movieState',
    default: initialState,
});
