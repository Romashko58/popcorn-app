import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MovieDetail, OMDbSearchResponse } from '../types/types';


const API_KEY = 'eb5051af';

export const omdbApi = createApi({
   reducerPath: 'omdbApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
   endpoints: (builder) => ({


      searchMovies: builder.query<OMDbSearchResponse, string>({
         query: (title) => `?apikey=${API_KEY}&s=${title}`,
      }),


      getMovieDetails: builder.query<MovieDetail, string>({
         query: (id) => `?apikey=${API_KEY}&i=${id}&plot=full`,
      }),
   }),
});


export const { useSearchMoviesQuery, useGetMovieDetailsQuery } = omdbApi;