import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllMovies, IMovie } from '../lib/db';
import Layout from '../components/Layout';
import MovieTag from '../components/MovieTag';

const Movies: React.FC<{ movies: IMovie[] }> = (props) => {
  const { movies } = props;

  return (
    <Layout title="Movies">
      <main>
        <div className="flex flex-wrap p-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href="/movies/[id]"
              as={`/movies/${movie.id}`}
              passHref
            >
              <div className="border border-grey-light bg-white rounded p-4 flex justify-between cursor-pointer">
                <div>
                  <p className="text-sm text-grey-dark">{movie.name}</p>
                  <div className="text-black font-bold text-xl mb-2">
                    {movie.description}
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div>Tags: </div>
                    {movie.tags.map((t) => (
                      <MovieTag key={t} tag={t} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const movies = getAllMovies();
  return {
    props: {
      movies,
    },
    revalidate: 1,
  };
};
export default Movies;
