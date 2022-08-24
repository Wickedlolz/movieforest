import { atom } from 'recoil';
import { IDetailedShow } from '../interfaces/show';
import { MovieReviewsProps } from '../interfaces/movie';
import { ActorsCredits } from '../interfaces/person';

interface IShowState {
    info: IDetailedShow | null;
    reviews: MovieReviewsProps[] | null;
    credits: ActorsCredits[] | null;
}

const initialState = {
    info: null,
    reviews: null,
    credits: null,
};

export const showState = atom<IShowState>({
    key: 'showState',
    default: initialState,
});
