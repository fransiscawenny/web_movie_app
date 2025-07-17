export interface MovieDetailInterface {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genres: { id: number; name: string }[];
    credits: {
        cast: CastMember[];
        crew: CrewMember[];
    };
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
}
