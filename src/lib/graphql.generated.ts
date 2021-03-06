import { endpointUrl } from './config';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  Time: any;
};

export type Moment = {
  __typename?: 'Moment';
  timestamp?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  movie: Movie;
  hitCount?: Maybe<Scalars['Int']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'Moment' input values */
export type MomentInput = {
  hitCount?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['String']>;
  movie?: Maybe<MomentMovieRelation>;
  description?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Moment' and 'Movie' using the field 'Moment.movie'. */
export type MomentMovieRelation = {
  /** Create a document of type 'Movie' and associate it with the current document. */
  create?: Maybe<MovieInput>;
  /** Connect a document of type 'Movie' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** The pagination object for elements of type 'Moment'. */
export type MomentPage = {
  __typename?: 'MomentPage';
  /** The elements of type 'Moment' in this page. */
  data: Array<Maybe<Moment>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  HLS_URL?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  guid?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  tags: TagPage;
  shortDescription?: Maybe<Scalars['String']>;
  moments: MomentPage;
  MP4_URL?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  DASH_URL: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

export type MovieTagsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type MovieMomentsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** 'Movie' input values */
export type MovieInput = {
  guid?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  shortDescription?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  HLS_URL?: Maybe<Scalars['String']>;
  DASH_URL: Scalars['String'];
  MP4_URL?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  tags?: Maybe<MovieTagsRelation>;
  moments?: Maybe<MovieMomentsRelation>;
};

/** Allow manipulating the relationship between the types 'Movie' and 'Moment'. */
export type MovieMomentsRelation = {
  /** Create one or more documents of type 'Moment' and associate them with the current document. */
  create?: Maybe<Array<Maybe<MomentInput>>>;
  /** Connect one or more documents of type 'Moment' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Moment' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** The pagination object for elements of type 'Movie'. */
export type MoviePage = {
  __typename?: 'MoviePage';
  /** The elements of type 'Movie' in this page. */
  data: Array<Maybe<Movie>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Movie' and 'Tag'. */
export type MovieTagsRelation = {
  /** Create one or more documents of type 'Tag' and associate them with the current document. */
  create?: Maybe<Array<Maybe<TagInput>>>;
  /** Connect one or more documents of type 'Tag' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Tag' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Update an existing document in the collection of 'Movie' */
  updateMovie?: Maybe<Movie>;
  /** Update an existing document in the collection of 'Moment' */
  updateMoment?: Maybe<Moment>;
  /** Create a new document in the collection of 'Moment' */
  createMoment: Moment;
  /** Delete an existing document in the collection of 'Tag' */
  deleteTag?: Maybe<Tag>;
  /** Delete an existing document in the collection of 'Moment' */
  deleteMoment?: Maybe<Moment>;
  /** Update an existing document in the collection of 'Tag' */
  updateTag?: Maybe<Tag>;
  /** Create a new document in the collection of 'Tag' */
  createTag: Tag;
  /** Delete an existing document in the collection of 'Movie' */
  deleteMovie?: Maybe<Movie>;
  /** Create a new document in the collection of 'Movie' */
  createMovie: Movie;
};

export type MutationUpdateMovieArgs = {
  id: Scalars['ID'];
  data: MovieInput;
};

export type MutationUpdateMomentArgs = {
  id: Scalars['ID'];
  data: MomentInput;
};

export type MutationCreateMomentArgs = {
  data: MomentInput;
};

export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteMomentArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateTagArgs = {
  id: Scalars['ID'];
  data: TagInput;
};

export type MutationCreateTagArgs = {
  data: TagInput;
};

export type MutationDeleteMovieArgs = {
  id: Scalars['ID'];
};

export type MutationCreateMovieArgs = {
  data: MovieInput;
};

export type Query = {
  __typename?: 'Query';
  momentsByMovie: QueryMomentsByMoviePage;
  /** Find a document from the collection of 'Moment' by its id. */
  findMomentByID?: Maybe<Moment>;
  /** Find a document from the collection of 'Tag' by its id. */
  findTagByID?: Maybe<Tag>;
  allMoments: MomentPage;
  allMovies: MoviePage;
  allTags: TagPage;
  findMovieByGuid?: Maybe<Movie>;
  /** Find a document from the collection of 'Movie' by its id. */
  findMovieByID?: Maybe<Movie>;
};

export type QueryMomentsByMovieArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  movieRef: Scalars['String'];
};

export type QueryFindMomentByIdArgs = {
  id: Scalars['ID'];
};

export type QueryFindTagByIdArgs = {
  id: Scalars['ID'];
};

export type QueryAllMomentsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type QueryAllMoviesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type QueryAllTagsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type QueryFindMovieByGuidArgs = {
  guid: Scalars['String'];
};

export type QueryFindMovieByIdArgs = {
  id: Scalars['ID'];
};

/** The pagination object for elements of type 'Moment'. */
export type QueryMomentsByMoviePage = {
  __typename?: 'QueryMomentsByMoviePage';
  /** The elements of type 'Moment' in this page. */
  data: Array<Maybe<Moment>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  name: Scalars['String'];
  movies: MoviePage;
};

export type TagMoviesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** 'Tag' input values */
export type TagInput = {
  name: Scalars['String'];
  movies?: Maybe<TagMoviesRelation>;
};

/** Allow manipulating the relationship between the types 'Tag' and 'Movie'. */
export type TagMoviesRelation = {
  /** Create one or more documents of type 'Movie' and associate them with the current document. */
  create?: Maybe<Array<Maybe<MovieInput>>>;
  /** Connect one or more documents of type 'Movie' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Movie' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** The pagination object for elements of type 'Tag'. */
export type TagPage = {
  __typename?: 'TagPage';
  /** The elements of type 'Tag' in this page. */
  data: Array<Maybe<Tag>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type UpdateMovieMutationVariables = Exact<{
  id: Scalars['ID'];
  data: MovieInput;
}>;

export type UpdateMovieMutation = { __typename?: 'Mutation' } & {
  updateMovie?: Maybe<
    { __typename?: 'Movie' } & Pick<
      Movie,
      | '_ts'
      | '_id'
      | 'guid'
      | 'name'
      | 'description'
      | 'shortDescription'
      | 'HLS_URL'
      | 'DASH_URL'
      | 'MP4_URL'
      | 'thumbnailUrl'
    > & {
        tags: { __typename?: 'TagPage' } & {
          data: Array<
            Maybe<{ __typename?: 'Tag' } & Pick<Tag, '_id' | 'name'>>
          >;
        };
      }
  >;
};

export type CreateTagMutationVariables = Exact<{
  data: TagInput;
}>;

export type CreateTagMutation = { __typename?: 'Mutation' } & {
  createTag: { __typename?: 'Tag' } & Pick<Tag, '_ts' | '_id' | 'name'>;
};

export type CreateMomentMutationVariables = Exact<{
  data: MomentInput;
}>;

export type CreateMomentMutation = { __typename?: 'Mutation' } & {
  createMoment: { __typename?: 'Moment' } & Pick<
    Moment,
    '_ts' | '_id' | 'hitCount' | 'timestamp' | 'description'
  > & { movie: { __typename?: 'Movie' } & Pick<Movie, '_id'> };
};

export type UpdateMomentMutationVariables = Exact<{
  id: Scalars['ID'];
  data: MomentInput;
}>;

export type UpdateMomentMutation = { __typename?: 'Mutation' } & {
  updateMoment?: Maybe<
    { __typename?: 'Moment' } & Pick<
      Moment,
      '_ts' | '_id' | 'hitCount' | 'timestamp' | 'description'
    > & { movie: { __typename?: 'Movie' } & Pick<Movie, '_id'> }
  >;
};

export type DeleteMomentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteMomentMutation = { __typename?: 'Mutation' } & {
  deleteMoment?: Maybe<{ __typename?: 'Moment' } & Pick<Moment, '_id'>>;
};

export type AllMoviesQueryVariables = Exact<{
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
}>;

export type AllMoviesQuery = { __typename?: 'Query' } & {
  allMovies: { __typename?: 'MoviePage' } & Pick<
    MoviePage,
    'after' | 'before'
  > & {
      data: Array<
        Maybe<
          { __typename?: 'Movie' } & Pick<
            Movie,
            | '_ts'
            | '_id'
            | 'guid'
            | 'name'
            | 'shortDescription'
            | 'description'
            | 'HLS_URL'
            | 'DASH_URL'
            | 'MP4_URL'
            | 'thumbnailUrl'
          > & {
              tags: { __typename?: 'TagPage' } & {
                data: Array<
                  Maybe<{ __typename?: 'Tag' } & Pick<Tag, '_id' | 'name'>>
                >;
              };
            }
        >
      >;
    };
};

export type AllTagsQueryVariables = Exact<{
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
}>;

export type AllTagsQuery = { __typename?: 'Query' } & {
  allTags: { __typename?: 'TagPage' } & Pick<TagPage, 'after' | 'before'> & {
      data: Array<Maybe<{ __typename?: 'Tag' } & Pick<Tag, '_id' | 'name'>>>;
    };
};

export type FindMovieByGuidQueryVariables = Exact<{
  guid: Scalars['String'];
}>;

export type FindMovieByGuidQuery = { __typename?: 'Query' } & {
  findMovieByGuid?: Maybe<
    { __typename?: 'Movie' } & Pick<
      Movie,
      | '_ts'
      | '_id'
      | 'guid'
      | 'name'
      | 'shortDescription'
      | 'description'
      | 'HLS_URL'
      | 'DASH_URL'
      | 'MP4_URL'
      | 'thumbnailUrl'
    > & {
        tags: { __typename?: 'TagPage' } & {
          data: Array<
            Maybe<{ __typename?: 'Tag' } & Pick<Tag, '_id' | 'name'>>
          >;
        };
      }
  >;
};

export type FindMovieByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type FindMovieByIdQuery = { __typename?: 'Query' } & {
  findMovieByID?: Maybe<
    { __typename?: 'Movie' } & Pick<
      Movie,
      | '_ts'
      | '_id'
      | 'guid'
      | 'name'
      | 'shortDescription'
      | 'description'
      | 'HLS_URL'
      | 'DASH_URL'
      | 'MP4_URL'
      | 'thumbnailUrl'
    > & {
        tags: { __typename?: 'TagPage' } & {
          data: Array<
            Maybe<{ __typename?: 'Tag' } & Pick<Tag, '_id' | 'name'>>
          >;
        };
      }
  >;
};

export type MomentsByMovieQueryVariables = Exact<{
  movieRef: Scalars['String'];
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
}>;

export type MomentsByMovieQuery = { __typename?: 'Query' } & {
  momentsByMovie: { __typename?: 'QueryMomentsByMoviePage' } & Pick<
    QueryMomentsByMoviePage,
    'after' | 'before'
  > & {
      data: Array<
        Maybe<
          { __typename?: 'Moment' } & Pick<
            Moment,
            '_id' | 'hitCount' | 'timestamp' | 'description'
          >
        >
      >;
    };
};

export const UpdateMovieDocument = `
    mutation UpdateMovie($id: ID!, $data: MovieInput!) {
  updateMovie(id: $id, data: $data) {
    _ts
    _id
    guid
    name
    description
    shortDescription
    HLS_URL
    DASH_URL
    MP4_URL
    tags {
      data {
        _id
        name
      }
    }
    thumbnailUrl
  }
}
    `;
export const useUpdateMovieMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateMovieMutation,
    TError,
    UpdateMovieMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateMovieMutation,
    TError,
    UpdateMovieMutationVariables,
    TContext
  >(
    (variables?: UpdateMovieMutationVariables) =>
      fetcher<UpdateMovieMutation, UpdateMovieMutationVariables>(
        UpdateMovieDocument,
        variables
      )(),
    options
  );
export const CreateTagDocument = `
    mutation CreateTag($data: TagInput!) {
  createTag(data: $data) {
    _ts
    _id
    name
  }
}
    `;
export const useCreateTagMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateTagMutation,
    TError,
    CreateTagMutationVariables,
    TContext
  >
) =>
  useMutation<CreateTagMutation, TError, CreateTagMutationVariables, TContext>(
    (variables?: CreateTagMutationVariables) =>
      fetcher<CreateTagMutation, CreateTagMutationVariables>(
        CreateTagDocument,
        variables
      )(),
    options
  );
export const CreateMomentDocument = `
    mutation CreateMoment($data: MomentInput!) {
  createMoment(data: $data) {
    _ts
    _id
    hitCount
    timestamp
    movie {
      _id
    }
    description
  }
}
    `;
export const useCreateMomentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateMomentMutation,
    TError,
    CreateMomentMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateMomentMutation,
    TError,
    CreateMomentMutationVariables,
    TContext
  >(
    (variables?: CreateMomentMutationVariables) =>
      fetcher<CreateMomentMutation, CreateMomentMutationVariables>(
        CreateMomentDocument,
        variables
      )(),
    options
  );
export const UpdateMomentDocument = `
    mutation UpdateMoment($id: ID!, $data: MomentInput!) {
  updateMoment(id: $id, data: $data) {
    _ts
    _id
    hitCount
    timestamp
    movie {
      _id
    }
    description
  }
}
    `;
export const useUpdateMomentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateMomentMutation,
    TError,
    UpdateMomentMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateMomentMutation,
    TError,
    UpdateMomentMutationVariables,
    TContext
  >(
    (variables?: UpdateMomentMutationVariables) =>
      fetcher<UpdateMomentMutation, UpdateMomentMutationVariables>(
        UpdateMomentDocument,
        variables
      )(),
    options
  );
export const DeleteMomentDocument = `
    mutation DeleteMoment($id: ID!) {
  deleteMoment(id: $id) {
    _id
  }
}
    `;
export const useDeleteMomentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteMomentMutation,
    TError,
    DeleteMomentMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeleteMomentMutation,
    TError,
    DeleteMomentMutationVariables,
    TContext
  >(
    (variables?: DeleteMomentMutationVariables) =>
      fetcher<DeleteMomentMutation, DeleteMomentMutationVariables>(
        DeleteMomentDocument,
        variables
      )(),
    options
  );
export const AllMoviesDocument = `
    query AllMovies($_size: Int, $_cursor: String) {
  allMovies(_size: $_size, _cursor: $_cursor) {
    after
    before
    data {
      _ts
      _id
      guid
      name
      shortDescription
      description
      HLS_URL
      DASH_URL
      MP4_URL
      tags {
        data {
          _id
          name
        }
      }
      thumbnailUrl
    }
  }
}
    `;
export const useAllMoviesQuery = <TData = AllMoviesQuery, TError = unknown>(
  variables?: AllMoviesQueryVariables,
  options?: UseQueryOptions<AllMoviesQuery, TError, TData>
) =>
  useQuery<AllMoviesQuery, TError, TData>(
    ['AllMovies', variables],
    fetcher<AllMoviesQuery, AllMoviesQueryVariables>(
      AllMoviesDocument,
      variables
    ),
    options
  );
useAllMoviesQuery.getKey = (variables?: AllMoviesQueryVariables) => [
  'AllMovies',
  variables,
];

export const AllTagsDocument = `
    query AllTags($_size: Int, $_cursor: String) {
  allTags(_size: $_size, _cursor: $_cursor) {
    after
    before
    data {
      _id
      name
    }
  }
}
    `;
export const useAllTagsQuery = <TData = AllTagsQuery, TError = unknown>(
  variables?: AllTagsQueryVariables,
  options?: UseQueryOptions<AllTagsQuery, TError, TData>
) =>
  useQuery<AllTagsQuery, TError, TData>(
    ['AllTags', variables],
    fetcher<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, variables),
    options
  );
useAllTagsQuery.getKey = (variables?: AllTagsQueryVariables) => [
  'AllTags',
  variables,
];

export const FindMovieByGuidDocument = `
    query FindMovieByGuid($guid: String!) {
  findMovieByGuid(guid: $guid) {
    _ts
    _id
    guid
    name
    shortDescription
    description
    HLS_URL
    DASH_URL
    MP4_URL
    tags {
      data {
        _id
        name
      }
    }
    thumbnailUrl
  }
}
    `;
export const useFindMovieByGuidQuery = <
  TData = FindMovieByGuidQuery,
  TError = unknown
>(
  variables: FindMovieByGuidQueryVariables,
  options?: UseQueryOptions<FindMovieByGuidQuery, TError, TData>
) =>
  useQuery<FindMovieByGuidQuery, TError, TData>(
    ['FindMovieByGuid', variables],
    fetcher<FindMovieByGuidQuery, FindMovieByGuidQueryVariables>(
      FindMovieByGuidDocument,
      variables
    ),
    options
  );
useFindMovieByGuidQuery.getKey = (variables: FindMovieByGuidQueryVariables) => [
  'FindMovieByGuid',
  variables,
];

export const FindMovieByIdDocument = `
    query FindMovieByID($id: ID!) {
  findMovieByID(id: $id) {
    _ts
    _id
    guid
    name
    shortDescription
    description
    HLS_URL
    DASH_URL
    MP4_URL
    tags {
      data {
        _id
        name
      }
    }
    thumbnailUrl
  }
}
    `;
export const useFindMovieByIdQuery = <
  TData = FindMovieByIdQuery,
  TError = unknown
>(
  variables: FindMovieByIdQueryVariables,
  options?: UseQueryOptions<FindMovieByIdQuery, TError, TData>
) =>
  useQuery<FindMovieByIdQuery, TError, TData>(
    ['FindMovieByID', variables],
    fetcher<FindMovieByIdQuery, FindMovieByIdQueryVariables>(
      FindMovieByIdDocument,
      variables
    ),
    options
  );
useFindMovieByIdQuery.getKey = (variables: FindMovieByIdQueryVariables) => [
  'FindMovieByID',
  variables,
];

export const MomentsByMovieDocument = `
    query MomentsByMovie($movieRef: String!, $_size: Int, $_cursor: String) {
  momentsByMovie(movieRef: $movieRef, _size: $_size, _cursor: $_cursor) {
    after
    before
    data {
      _id
      hitCount
      timestamp
      description
    }
  }
}
    `;
export const useMomentsByMovieQuery = <
  TData = MomentsByMovieQuery,
  TError = unknown
>(
  variables: MomentsByMovieQueryVariables,
  options?: UseQueryOptions<MomentsByMovieQuery, TError, TData>
) =>
  useQuery<MomentsByMovieQuery, TError, TData>(
    ['MomentsByMovie', variables],
    fetcher<MomentsByMovieQuery, MomentsByMovieQueryVariables>(
      MomentsByMovieDocument,
      variables
    ),
    options
  );
useMomentsByMovieQuery.getKey = (variables: MomentsByMovieQueryVariables) => [
  'MomentsByMovie',
  variables,
];
