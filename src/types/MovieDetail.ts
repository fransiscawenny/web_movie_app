export interface MovieDetailInterface {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
    genres: { id: number; name: string }[];
    credits: {
        cast: CastMember[];
        crew: CrewMember[];
    };
}

export interface CastMember {
    id: number;
    name: string;
    profile_path: string | null;
    order: number;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
}
