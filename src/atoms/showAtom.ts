import { atom } from 'recoil';
import { IDetailedShow } from '../interfaces/show';
import { MovieReviewsProps } from '../interfaces/movie';

interface IShowState {
    info: IDetailedShow | null;
    reviews: MovieReviewsProps[] | null;
}

const initialState = {
    info: null,
    reviews: null,
};

export const showState = atom<IShowState>({
    key: 'showState',
    default: initialState,
});
