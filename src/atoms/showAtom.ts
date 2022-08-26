import { atom } from 'recoil';
import { IDetailedShow } from '../interfaces/show';
import { IMovieReviews, IMovie } from '../interfaces/movie';
import { IActorsCredits } from '../interfaces/person';

interface IShow {
    info: IDetailedShow | null;
    reviews: IMovieReviews[] | null;
    credits: IActorsCredits[] | null;
    recommendations: IMovie[] | [];
}

const initialState = {
    info: null,
    reviews: null,
    credits: null,
    recommendations: [],
};

export const showState = atom<IShow>({
    key: 'showState',
    default: initialState,
});
