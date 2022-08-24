import { atom } from 'recoil';
import {
    MovieInfoProps,
    MovieVideoProps,
    MovieReviewsProps,
    MovieProps,
} from '../interfaces/movie';
import { ActorsCredits } from '../interfaces/person';

interface IMovieState {
    info: MovieInfoProps | null;
    video: MovieVideoProps | null;
    reviews: MovieReviewsProps[] | null;
    credits: ActorsCredits[] | null;
    recommendations: MovieProps[] | [];
}

const initialState = {
    info: null,
    video: null,
    reviews: null,
    credits: null,
    recommendations: [],
};

export const movieState = atom<IMovieState>({
    key: 'movieState',
    default: initialState,
});
