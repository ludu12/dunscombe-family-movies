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
  useUpdateMovieMutation,
} from '../../lib/graphql.generated';

const MoviePage: React.FC<{ movie: Movie }> = (props) => {
  const [movie, setMovie] = React.useState(props.movie);

  const { mutate } = useUpdateMovieMutation();

  const handleSubmit = () => {
    mutate({
      id: movie._id,
      data: {
        name: movie.name,
        description: movie.description,
        DASH_URL: movie.DASH_URL,
      },
    });
  };

  return (
    <Layout title={movie.name}>
      <main className="m-auto lg:mx-16">
        <div className="py-4">
          <h2 className="text-2xl">{movie.name}</h2>
          <div role="doc-subtitle">{movie.description}</div>
          <textarea
            value={movie.description || ''}
            onChange={(e) => {
              setMovie({
                ...movie,
                description: e.target.value,
              });
            }}
          />
        </div>
        <VideoPlayer src={movie.DASH_URL} />
        <div className="flex flex-wrap items-center py-4">
          <div>Tags:</div>
          {movie.tags.data.map((t) => (
            <MovieTag key={t._id} tag={t.name} />
          ))}
        </div>
        <button onClick={handleSubmit}>UPDATE</button>
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
