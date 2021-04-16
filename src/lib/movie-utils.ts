import {
  Maybe,
  Movie,
  Tag,
  UpdateMovieMutationVariables,
} from './graphql.generated';

export function mutationBuilder(
  newMovie: Movie,
  oldMovie: Movie,
  allTags: Array<Maybe<{ __typename?: 'Tag' } & Pick<Tag, '_id' | 'name'>>>
): UpdateMovieMutationVariables {
  const IDLessTags = newMovie.tags.data.filter((t) => !t._id);
  const createTags = IDLessTags.filter(
    (t) => !allTags.some((x) => x.name === t.name)
  ).map((t) => ({ name: t.name }));
  const connectTags = allTags
    .filter((t) => IDLessTags.some((x) => x.name === t.name))
    .map((t) => t._id);
  const deleteTags = oldMovie.tags.data
    .filter((t) => !newMovie.tags.data.some((x) => x._id === t._id))
    .map((t) => t._id);

  return {
    id: newMovie._id,
    data: {
      name: newMovie.name,
      description: newMovie.description,
      shortDescription: newMovie.shortDescription,
      DASH_URL: newMovie.DASH_URL,
      tags: {
        create: createTags,
        connect: connectTags,
        disconnect: deleteTags,
      },
    },
  };
}
