import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import { MovieProps } from '../typings';

interface MoviesStateProps {
    nowPlaying: MovieProps[];
    popular: MovieProps[];
    topRated: MovieProps[];
    upcoming: MovieProps[];
}

export const moviesState = atom<MoviesStateProps | DocumentData | null>({
    key: 'moviesState',
    default: null,
});
