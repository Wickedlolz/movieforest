import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import { IMovie } from '../interfaces/movie';
import { IShow } from '../interfaces/show';

interface IMovies {
    nowPlaying: IMovie[];
    popular: IMovie[];
    topRated: IMovie[];
    upcoming: IMovie[];
    showsOnAir: IShow[];
}

export const moviesState = atom<IMovies | DocumentData | null>({
    key: 'moviesState',
    default: null,
});
