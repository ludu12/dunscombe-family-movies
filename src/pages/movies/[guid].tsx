import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import VideoPlayer from '../../components/VideoPlayer';
import Layout from '../../components/Layout';
import MovieTag from '../../components/MovieTag';
import { graphqlRequest } from '../../lib/rest-utils';
import {
  AllMoviesDocument,
  AllMoviesQuery,
  FindMovieByGuidDocument,
  FindMovieByGuidQuery,
  Movie,
  Tag,
  useAllTagsQuery,
  useUpdateMovieMutation,
} from '../../lib/graphql.generated';
import isEqual from 'lodash/isEqual';
import { PrimaryButton } from '../../components/common/Button';
import { Spin } from '../../components/common/Animation';

const MoviePage: React.FC<{ movie: Movie }> = (props) => {
  const [movie, setMovie] = React.useState(props.movie);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const { data, isLoading: isLoadingTags } = useAllTagsQuery();
  const allTags = data?.allTags?.data;
  const { mutate, isLoading } = useUpdateMovieMutation();

  React.useEffect(() => {
    setIsDisabled(isEqual(props.movie, movie));
  }, [props.movie, movie]);

  const handleSubmit = () => {
    const IDLessTags = movie.tags.data.filter((t) => !t._id);
    const createTags = IDLessTags.filter(
      (t) => !allTags.some((x) => x.name === t.name)
    ).map((t) => ({ name: t.name }));
    const connectTags = allTags
      .filter((t) => IDLessTags.some((x) => x.name === t.name))
      .map((t) => t._id);
    const deleteTags = props.movie.tags.data
      .filter((t) => !movie.tags.data.some((x) => x._id === t._id))
      .map((t) => t._id);

    mutate({
      id: movie._id,
      data: {
        name: movie.name,
        description: movie.description,
        shortDescription: movie.shortDescription,
        DASH_URL: movie.DASH_URL,
        tags: {
          create: createTags,
          connect: connectTags,
          disconnect: deleteTags,
        },
      },
    });
  };

  const handleChange = React.useCallback(
    (field) => (event) => {
      setMovie((m) => ({
        ...m,
        [field]: event.target.value,
      }));
    },
    []
  );

  const handleTagDelete = React.useCallback(
    (index) => () => {
      setMovie((m) => ({
        ...m,
        tags: {
          ...m.tags,
          data: m.tags.data.filter((t, i) => i !== index),
        },
      }));
    },
    []
  );

  const handleTagAdd = React.useCallback(() => {
    const newTag = ({ name: '' } as unknown) as Tag;
    setMovie((m) => ({
      ...m,
      tags: {
        ...m.tags,
        data: m.tags.data.concat(newTag),
      },
    }));
  }, []);

  const handleTagUpdate = (index) => (name: string) => {
    const newData = movie.tags.data
      .map((t, i) => {
        if (i === index) {
          if (name === '' || movie.tags.data.some((t) => t.name === name)) {
            return null;
          }
          return ({ name } as unknown) as Tag;
        }
        return t;
      })
      .filter(Boolean);
    setMovie({
      ...movie,
      tags: {
        ...movie.tags,
        data: newData,
      },
    });
  };

  return (
    <Layout title={movie.name}>
      <main className="m-auto lg:mx-16">
        <div className="flex my-4 justify-between align-top shadow-md rounded p-1 border">
          <div className="flex-1">
            <h2 className="text-2xl">{movie.name}</h2>
            <input
              className="p-1 w-60"
              maxLength={50}
              placeholder={'Type a short description...'}
              value={movie.shortDescription || ''}
              onChange={handleChange('shortDescription')}
            />
          </div>
          <PrimaryButton
            disabled={isDisabled || isLoading}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Save
          </PrimaryButton>
        </div>
        <VideoPlayer src={movie.DASH_URL} />
        <div className="my-4 flex flex-col shadow-md rounded p-1 border">
          <div className="flex flex-wrap items-center py-2">
            <div>Tags:</div>
            {movie.tags.data.map((t, i) => (
              <MovieTag
                key={i}
                tag={t}
                onDelete={handleTagDelete(i)}
                onUpdate={handleTagUpdate(i)}
              />
            ))}
            {isLoadingTags ? (
              <Spin isSpinning={isLoadingTags} />
            ) : (
              <button
                title={'Add tag'}
                onClick={handleTagAdd}
                className="box-border bg-grey-light font-medium hover:bg-grey text-gray-700 bg-gray-100 border border-gray-300 font-bold rounded-full inline-flex items-center w-5 h-5 ml-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x hover:text-gray-400 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            )}
          </div>
          <div>
            <div>Description:</div>
            <textarea
              className="p-2 w-full border rounded resize-none"
              maxLength={200}
              placeholder={'Any other details?...'}
              value={movie.description || ''}
              onChange={handleChange('description')}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const request = JSON.stringify({
    query: AllMoviesDocument,
  });
  const response = await graphqlRequest<{
    data: AllMoviesQuery;
    errors: { message: string }[];
  }>(request, process.env.FAUNA_SERVER_KEY);

  const paths = response.data.allMovies.data.map((movie) => ({
    params: { guid: movie.guid },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const request = JSON.stringify({
    query: FindMovieByGuidDocument,
    variables: { guid: params.guid },
  });
  const response = await graphqlRequest<{
    data: FindMovieByGuidQuery;
    errors: { message: string }[];
  }>(request, process.env.FAUNA_SERVER_KEY);

  return {
    props: {
      movie: response.data.findMovieByGuid,
    },
    revalidate: 1,
  };
};

export default MoviePage;
