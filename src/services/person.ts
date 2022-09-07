import * as request from './request';
import { IActor, IPerson, IPersonCasts } from '../interfaces/person';

const API_KEY: string = '356b2832036b27a06f949b42c2d89747';

const endpoints = {
    GET_PERSON_BY_ID: (personId: string) =>
        `/person/${personId}?api_key=${API_KEY}&language=en-US`,
    GET_PERSON_MOVIE_CREDITS_BY_ID: (personId: string) =>
        `/person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`,
    POPULAR_ACTORS: `/person/popular?api_key=${API_KEY}&language=en-US&page=1`,
};

export async function getPopularActors(): Promise<IActor[]> {
    const result = await request.get(endpoints.POPULAR_ACTORS);
    return result.results;
}

export async function getPersonById(id: string): Promise<IPerson> {
    return request.get(endpoints.GET_PERSON_BY_ID(id));
}

export async function getPersonCastsById(id: string): Promise<IPersonCasts[]> {
    const result = await request.get(
        endpoints.GET_PERSON_MOVIE_CREDITS_BY_ID(id)
    );
    return result.cast;
}
