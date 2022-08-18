import { MovieProps } from '../typings';

const API_KEY: string = '356b2832036b27a06f949b42c2d89747';
const baseUrl: string = `https://api.themoviedb.org/3`;

export const endpoints = {
    UPCOMING: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    TOP_RATED: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
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
    GET_RECOMMENDATIONS_BY_ID: (movieId: string) =>
        `/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    GET_MOVIE_CREDITS: (movieId: string) =>
        `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    GET_MOVIE_REVIEWS_BY_ID: (movieId: string) =>
        `/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
};

export async function request(url: string): Promise<any> {
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

export async function requestByCategory(url: string): Promise<void> {
    try {
        const response = await fetch(baseUrl + url);

        if (response.ok === false) {
            throw new Error(response.statusText);
        }

        const result = await response.json();

        return result.results;
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}

export async function getAllMovies(url: string): Promise<MovieProps[] | any> {
    try {
        const response = await request(url);
        return response;
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}

export async function getMovieDetailedInfo(movieId: string) {
    try {
        return await Promise.all([
            request(endpoints.GET_DETAILS_BY_ID(movieId)),
            request(endpoints.GET_VIDEOS_BY_ID(movieId)),
        ]);
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}

export async function getMovieReviewsById(movieId: string): Promise<any> {
    return request(endpoints.GET_MOVIE_REVIEWS_BY_ID(movieId));
}
