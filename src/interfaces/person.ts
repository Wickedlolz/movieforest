export interface PersonStateProps {
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

export interface PersonCastsStateProps {
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
