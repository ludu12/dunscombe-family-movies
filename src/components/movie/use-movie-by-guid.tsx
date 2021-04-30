import {
  Movie,
  Tag,
  useFindMovieByGuidQuery,
  useUpdateMovieMutation,
} from '../../lib/graphql.generated';
import React from 'react';
import isEqual from 'lodash/isEqual';
import { mutationBuilder } from '../../lib/movie/movie-utils';
import { AllTagsQueryKey, useAllTags } from './use-all-tags';
import { useQueryClient } from 'react-query';
import { AllMoviesQueryKey } from './use-all-movies';

export const useMovieByGuid = (guid: string, initialMovie: Movie) => {
  const queryClient = useQueryClient();
  const query = useFindMovieByGuidQuery(
    { guid },
    {
      initialData: { findMovieByGuid: initialMovie },
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
  const movieData = query.data?.findMovieByGuid;
  const [movie, setMovie] = React.useState(movieData);

  const mutation = useUpdateMovieMutation({
    onMutate: async () => {
      const key = useFindMovieByGuidQuery.getKey({ guid });
      await queryClient.cancelQueries(key);

      const previous = queryClient.getQueryData(key);
      queryClient.setQueryData(key, {
        findMovieByGuid: movie,
      });

      return previous;
    },
    onSuccess: async (data) => {
      const key = useFindMovieByGuidQuery.getKey({ guid });

      queryClient.setQueryData(key, {
        findMovieByGuid: data.updateMovie,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(AllMoviesQueryKey);
      await queryClient.refetchQueries(AllTagsQueryKey, {
        active: true,
        inactive: true,
      });
    },
  });

  const { data } = useAllTags();
  const allTags = data?.allTags?.data;

  React.useEffect(() => {
    setMovie(movieData);
  }, [movieData]);

  const handleChange = React.useCallback(
    (field) => (event) => {
      setMovie((m) => ({
        ...m,
        [field]: event.target.value,
      }));
    },
    []
  );

  const handleTagMutation = async (tags: Tag[]) => {
    const newMovie = {
      ...movie,
      tags: {
        ...movie.tags,
        data: tags,
      },
    };
    setMovie(newMovie);
    mutation.mutate(mutationBuilder(newMovie, movieData, allTags));
  };

  const triggerMutation = () => {
    if (!isEqual(movieData, movie)) {
      mutation.mutate(mutationBuilder(movie, movieData, allTags));
    }
  };

  return {
    isLoading: query.isLoading,
    isMutating: mutation.isLoading,
    movie,
    handleChange,
    handleTagMutation,
    triggerMutation,
  };
};
