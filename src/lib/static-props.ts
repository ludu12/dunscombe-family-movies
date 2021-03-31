import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { getSession } from './auth-cookies';
import { ServerResponse } from 'http';
import {
  AllMoviesDocument,
  AllMoviesQuery,
  FindMovieByGuidDocument,
  FindMovieByGuidQuery,
} from './graphql.generated';
import { graphqlRequest } from './rest-utils';
import { sortByDiscNumber } from './utils';

export const allMoviesStaticPaths: GetStaticPaths = async () => {
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

export const allMoviesStaticProps: GetStaticProps = async () => {
  const request = JSON.stringify({
    query: AllMoviesDocument,
  });
  const response = await graphqlRequest<{
    data: AllMoviesQuery;
    errors: { message: string }[];
  }>(request, process.env.FAUNA_SERVER_KEY);

  return {
    props: {
      movies: response.data.allMovies.data.sort(sortByDiscNumber),
    },
    revalidate: 1,
  };
};

export const findMovieByGuidStaticProps: GetStaticProps = async ({
  params,
}) => {
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
