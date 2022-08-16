import { Movie } from '../typings';

const API_KEY: string = '356b2832036b27a06f949b42c2d89747';
const baseUrl: string = `https://api.themoviedb.org/3`;

export const endpoints = {
    UPCOMING: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    TOP_RATED: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=2`,
    POPULAR: `/movie/popular?api_key=${API_KEY}&language=en-US&page=2`,
    NOW_PLAYING: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    GET_DETAILS_BY_ID: (movieId: string) =>
        `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    GET_VIDEOS_BY_ID: (movieId: string) =>
        `/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
    POPULAR_ACTORS: `/person/popular?api_key=${API_KEY}&language=en-US&page=1`,
    GET_PERSON_BY_ID: (personId: string) =>
        `/person/${personId}?api_key=${API_KEY}&language=en-US`,
    GET_PERSON_MOVIE_CREDITS_BY_ID: (personId: string) =>
        `/person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`,
};

async function request(url: string): Promise<void> {
    try {
        const response = await fetch(baseUrl + url);

        if (response.ok === false) {
            throw new Error(response.statusText);
        }

        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}

export async function getAllMovies(url: string): Promise<Movie[] | any> {
    try {
        const response = await request(url);
        return response;
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}
