export interface MovieProps {
    title: string;
    backdrop_path: string;
    media_type?: string;
    release_date?: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface MovieVideosProps {
    id: string;
    results: [];
}

export interface MovieInfoProps {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {};
    budget: number;
    genres: [];
    length: number;
    homepage: string;
    id: number | string;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: 6999.193;
    poster_path: string;
    production_companies: [];
    production_countries: [];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: [];
    status: string;
    tagline: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
}
