export interface MovieFromSearch {
   Title: string;
   Year: string;
   imdbID: string;
   Type: 'movie' | 'series' | 'episode';
   Poster: string;
}

export interface OMDbSearchResponse {
   Search?: MovieFromSearch[];
   totalResults?: string;
   Response: 'True' | 'False';
   Error?: string;
   page?: number
}

export interface MovieDetail {
   Title: string;
   Year: string;
   Rated: string;
   Released: string;
   Runtime: string;
   Genre: string;
   Director: string;
   Writer: string;
   Actors: string;
   Plot: string;
   Language: string;
   Country: string;
   Awards: string;
   Poster: string;
   imdbRating: string;
   imdbID: string;
   Type: 'movie' | 'series' | 'episode';
   Response: 'True' | 'False';

   BoxOffice?: string;
   Season?: string;
   Episode?: string;
   seriesID?: string;
}