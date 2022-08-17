import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import { MovieProps } from '../typings';

export const movieState = atom<MovieProps | DocumentData | null>({
    key: 'movieState',
    default: null,
});
