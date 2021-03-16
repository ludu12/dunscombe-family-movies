import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import VideoPlayer from '../../components/VideoPlayer';
import { getAllMovies, getMovieById, IMovie } from '../../lib/db';
import Layout from '../../components/Layout';
import MovieTag from '../../components/MovieTag';

function toMovieUrl(movie: IMovie): string {
  const cloudfrontURL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
  return cloudfrontURL + movie.id + movie.DASH_URL;
}

const Movie: React.FC<{ movie: IMovie }> = (props) => {
  const { movie } = props;
  return (
    <Layout title={movie.name}>
      <main className="m-auto lg:mx-16">
        <div className="py-4">
          <h2 className="text-2xl">{movie.name}</h2>
          <div role="doc-subtitle">{movie.description}</div>
        </div>
        <VideoPlayer src={toMovieUrl(movie)} />
        <div className="flex flex-wrap items-center py-4">
          <div>Tags: </div>
          {movie.tags.map((t) => (
            <MovieTag key={t} tag={t} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllMovies().map((movie) => ({
    params: { id: movie.id },
  }));

  return { paths, fallback: true };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movie = getMovieById(params.id as string);
  return {
    props: {
      movie,
    },
    revalidate: 1,
  };
};
export default Movie;
