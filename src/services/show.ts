import request from './request';
import { IShow } from '../interfaces/show';
import { IMovieReviews } from '../interfaces/movie';

const API_KEY: string = '356b2832036b27a06f949b42c2d89747';

const endpoints = {
    GET_SHOW_BY_ID_WITH_VIDEOS: (tvId: string) =>
        `/tv/${tvId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
    GET_SHOW_CREDITS: (showId: string) =>
        `/tv/${showId}/credits?api_key=${API_KEY}&language=en-US`,
    GET_SHOW_REVIEWS_BY_ID: (showId: string) =>
        `/tv/${showId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
    GET_SHOW_RECOMENDATIONS_BY_ID: (showId: string) =>
        `/tv/${showId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    TV_AIRING_TODAY: (page?: number) =>
        `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
    TV_ON_THE_AIR: (page?: number) =>
        `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
    TV_POPULAR: (page?: number) =>
        `/tv/popular?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
    TV_TOP_RATED: (page?: number) =>
        `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${
            page === undefined ? 1 : page
        }`,
};

export async function getAiringTodayShows(page?: number): Promise<IShow[]> {
    const result = await request(endpoints.TV_AIRING_TODAY(page));
    return result.results;
}

export async function getOnTheAirShows(page?: number): Promise<IShow[]> {
    const result = await request(endpoints.TV_ON_THE_AIR(page));
    return result.results;
}

export async function getPopularShows(page?: number): Promise<IShow[]> {
    const result = await request(endpoints.TV_POPULAR(page));
    return result.results;
}

export async function getTopRatedShows(page?: number): Promise<IShow[]> {
    const result = await request(endpoints.TV_TOP_RATED(page));
    return result.results;
}

export async function getShowByIdWithVideos(id: string): Promise<any> {
    return request(endpoints.GET_SHOW_BY_ID_WITH_VIDEOS(id));
}

export async function getShowsReviewsById(
    id: string
): Promise<IMovieReviews[]> {
    const result = await request(endpoints.GET_SHOW_REVIEWS_BY_ID(id));
    return result.results;
}

export async function getShowCreditsById(showId: string) {
    const result = await request(endpoints.GET_SHOW_CREDITS(showId));
    return result.cast;
}

export async function getShowRecommendationsById(movieId: string) {
    const result = await request(
        endpoints.GET_SHOW_RECOMENDATIONS_BY_ID(movieId)
    );

    return result.results;
}

export async function getByCategory(
    category: string,
    currentPage: number
): Promise<IShow[]> {
    const categories: any = {
        airingToday: endpoints.TV_AIRING_TODAY(currentPage),
        onTheAir: endpoints.TV_ON_THE_AIR(currentPage),
        topRated: endpoints.TV_TOP_RATED(currentPage),
        popular: endpoints.TV_POPULAR(currentPage),
    };

    const result = await request(categories[category]);

    return result.results;
}
