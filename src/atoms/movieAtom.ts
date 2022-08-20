import { atom } from 'recoil';
import { MovieInfoProps } from '../typings';

interface MovieStateProps {
    movieInfo: MovieInfoProps | null;
    movieVideos: any | null;
    movieReviews: [] | null;
}

const initialState = {
    movieInfo: null,
    movieVideos: null,
    movieReviews: null,
};

export const movieState = atom<MovieStateProps>({
    key: 'movieState',
    default: initialState,
});
