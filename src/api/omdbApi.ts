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


      getMovieById: builder.query<MovieDetail, { id: string; plot?: 'short' | 'full' }>({
         query: ({ id, plot = 'short' }) => `?apikey=${API_KEY}&i=${id}&plot=${plot}`,


      }),
   }),
});


export const { useSearchMoviesQuery, useGetMovieByIdQuery } = omdbApi;