import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MovieDetail, OMDbSearchResponse } from '../types/types';


const API_KEY = 'eb5051af';

export const omdbApi = createApi({
   reducerPath: 'omdbApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
   endpoints: (builder) => ({


      searchMovies: builder.query<OMDbSearchResponse, { title: string; page: number }>({
         query: ({ title, page }) => `?apikey=${API_KEY}&s=${title}&page=${page}`,
         serializeQueryArgs: ({ endpointName, queryArgs }) => {
            return `${endpointName}_${queryArgs.title}`;
         },

         merge: (currentCache, newItems, { arg }) => {
            if (arg.page === 1) {
               return newItems;
            }
            if (currentCache.Search && newItems.Search) {
               currentCache.Search.push(...newItems.Search);
            }
         },

         forceRefetch({ currentArg, previousArg }) {
            return (
               currentArg?.title !== previousArg?.title ||
               currentArg?.page !== previousArg?.page
            );
         },
      }),


      getMovieById: builder.query<MovieDetail, { id: string; plot?: 'short' | 'full' }>({
         query: ({ id, plot = 'short' }) => `?apikey=${API_KEY}&i=${id}&plot=${plot}`,


      }),
   }),
});


export const { useSearchMoviesQuery, useGetMovieByIdQuery } = omdbApi;