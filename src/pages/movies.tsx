import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import MovieTag from '../components/movie/MovieTag';
import { Movie } from '../lib/graphql.generated';
import { allMoviesStaticProps } from '../lib/static-props';

const Movies: React.FC<{ movies: Movie[] }> = (props) => {
  const { movies } = props;

  return (
    <Layout title="Movies">
      <main>
        <div className="flex flex-wrap p-4">
          {movies.map((movie) => (
            <Link
              key={movie._id}
              href="/movies/[guid]"
              as={`/movies/${movie.guid}`}
              passHref
            >
              <div className="border border-grey-light bg-white rounded p-4 flex justify-between cursor-pointer m-4 flex-1">
                <div className="flex flex-col justify-between">
                  <p className="text-sm text-grey-dark">{movie.name}</p>
                  <div className="text-black font-bold text-xl mb-2">
                    {movie.shortDescription}
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div>Tags:</div>
                    {movie.tags.data.map((t) => (
                      <MovieTag key={t._id} tag={t} />
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

export const getStaticProps = allMoviesStaticProps;
export default Movies;
