export interface IShow {
    backdrop_path: string;
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

interface ICreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

interface IGenres {
    id: number;
    name: string;
}

interface IEpisodeOnAir {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
}

interface INetworks {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
}

interface IProductionCompanies {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface IProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface ISeasons {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

interface ISpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface IVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface IDetailedShow {
    adult: boolean | undefined;
    backdrop_path: string;
    created_by: ICreatedBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: IGenres[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: IEpisodeOnAir;
    name: string;
    next_episode_to_air: IEpisodeOnAir;
    networks: INetworks[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProductionCompanies[];
    production_countries: IProductionCountries[];
    seasons: ISeasons[];
    spoken_languages: ISpokenLanguages[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    videos: IVideo;
}
