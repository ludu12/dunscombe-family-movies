import { useAllTagsQuery } from '../../lib/graphql.generated';

export const useAllTags = () => {
  return useAllTagsQuery({ _size: 1000 }, { staleTime: 60 * 1000 });
};

export const AllTagsQueryKey = useAllTagsQuery.getKey({ _size: 1000 });
