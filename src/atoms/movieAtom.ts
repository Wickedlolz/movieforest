import { atom } from 'recoil';
import {
    IMovieInfo,
    IMovieVideo,
    IMovieReviews,
    IMovie,
} from '../interfaces/movie';
import { IActorsCredits } from '../interfaces/person';

interface IMovieState {
    info: IMovieInfo | null;
    video: IMovieVideo | null;
    reviews: IMovieReviews[] | null;
    credits: IActorsCredits[] | null;
    recommendations: IMovie[] | [];
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
