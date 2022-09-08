import * as request from './request';
import { IMovie, IMovieInfo, IMovieVideo, ISearch } from '../interfaces/movie';

const API_KEY: string = '356b2832036b27a06f949b42c2d89747';

const endpoints = {
    UPCOMING: (page?: number) =>
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
    TOP_RATED: (page?: number) =>
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
    POPULAR: (page?: number) =>
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
    NOW_PLAYING: (page?: number) =>
        `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
    GET_DETAILS_BY_ID: (movieId: string) =>
        `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    GET_VIDEOS_BY_ID: (movieId: string) =>
        `/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
    GET_RECOMMENDATIONS_BY_ID: (movieId: string) =>
        `/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    GET_MOVIE_CREDITS: (movieId: string) =>
        `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    GET_MOVIE_REVIEWS_BY_ID: (movieId: string) =>
        `/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
    SEARCH: (search: string) =>
        `/search/movie?api_key=${API_KEY}&query=${search}`,
};

export async function getMovieReviewsById(movieId: string): Promise<any> {
    return request.get(endpoints.GET_MOVIE_REVIEWS_BY_ID(movieId));
}

export async function getUpcomingMovies(page?: number): Promise<IMovie[]> {
    const result = await request.get(endpoints.UPCOMING(page));
    return result.results;
}

export async function getTopRatedMovies(page?: number): Promise<IMovie[]> {
    const result = await request.get(endpoints.TOP_RATED(page));
    return result.results;
}

export async function getPopularMovies(page?: number): Promise<IMovie[]> {
    const result = await request.get(endpoints.POPULAR(page));
    return result.results;
}

export async function getNowPlayingMovies(page?: number): Promise<IMovie[]> {
    const result = await request.get(endpoints.NOW_PLAYING(page));
    return result.results;
}

export async function getMovieDetailedInfo(
    movieId: string
): Promise<[IMovieInfo, IMovieVideo[]]> {
    try {
        return await Promise.all([
            request.get(endpoints.GET_DETAILS_BY_ID(movieId)),
            request
                .get(endpoints.GET_VIDEOS_BY_ID(movieId))
                .then((result: any) => result.results),
        ]);
    } catch (error: any) {
        throw error;
    }
}

export async function getMovieCreditsById(movieId: string) {
    const result = await request.get(endpoints.GET_MOVIE_CREDITS(movieId));

    return result.cast;
}

export async function getMovieRecommendationsById(movieId: string) {
    const result = await request.get(
        endpoints.GET_RECOMMENDATIONS_BY_ID(movieId)
    );
    return result.results;
}

export async function getByCategory(
    category: string,
    currentPage: number
): Promise<IMovie[]> {
    const categories: any = {
        upcoming: endpoints.UPCOMING(currentPage),
        nowPlaying: endpoints.NOW_PLAYING(currentPage),
        topRated: endpoints.TOP_RATED(currentPage),
        popular: endpoints.POPULAR(currentPage),
    };

    const result = await request.get(categories[category]);

    return result.results;
}

export async function search(searchedMovie: string): Promise<ISearch[]> {
    const search: string = encodeURI(searchedMovie);
    const result = await request.get(endpoints.SEARCH(search));

    return result.results;
}
