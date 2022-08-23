import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import { MovieProps } from '../interfaces/movie';
import { IShow } from '../interfaces/show';

interface MoviesStateProps {
    nowPlaying: MovieProps[];
    popular: MovieProps[];
    topRated: MovieProps[];
    upcoming: MovieProps[];
    showsOnAir: IShow[];
}

export const moviesState = atom<MoviesStateProps | DocumentData | null>({
    key: 'moviesState',
    default: null,
});
