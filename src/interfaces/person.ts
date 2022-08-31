export interface IPerson {
    birthday: string | null;
    known_for_department: string;
    deathday: string | null;
    id: number;
    name: string;
    also_known_as: [];
    gender: number;
    default: number;
    minimum: number;
    maximum: number;
    biography: string;
    popularity: number;
    place_of_birth: string | null;
    profile_path: string | null;
    adult: boolean;
    imdb_id: string;
    homepage: string | null;
}

export interface IPersonCasts {
    character: string;
    credit_id: string;
    release_date: string;
    vote_count: number;
    video: boolean;
    adult: boolean;
    vote_average: number;
    title: string;
    genre_ids: [];
    original_language: string;
    original_title: string;
    popularity: number;
    id: number;
    backdrop_path: string | null;
    overview: string;
    poster_path: string | null;
}

export interface IActorsCredits {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

interface IKnownFor {
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    original_title: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export interface IActor {
    profile_path: string;
    adult: boolean;
    id: number;
    known_for: IKnownFor;
    name: string;
    popularity: number;
    total_results: number;
    total_pages: number;
}
