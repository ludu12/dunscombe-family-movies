import { Movie, useAllMoviesQuery } from '../../lib/graphql.generated';

export const useAllMovies = (initialMovies: Movie[]) => {
  return useAllMoviesQuery(null, {
    initialData: { allMovies: { data: initialMovies } },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export const AllMoviesQueryKey = useAllMoviesQuery.getKey(null);
