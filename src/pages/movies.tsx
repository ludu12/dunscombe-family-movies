import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import MovieTag from '../components/movie/MovieTag';
import { Movie } from '../lib/graphql.generated';
import { allMoviesStaticProps } from '../lib/static-props';

const Movies: React.FC<{ movies: Movie[] }> = (props) => {
  const { movies } = props;

  return (
    <Layout title="Movies" redirect>
      <main>
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
          {movies.map((movie) => (
            <Link
              key={movie._id}
              href="/movies/[guid]"
              as={`/movies/${movie.guid}`}
              passHref
            >
              <div className="border border-grey-light bg-white rounded p-4 flex justify-between cursor-pointer m-4 flex-1">
                <div className="flex flex-col justify-between overflow-hidden">
                  <p className="text-sm text-grey-dark overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0">
                    {movie.name}
                  </p>
                  <div className="text-black font-bold text-xl mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0">
                    {movie.shortDescription}
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div className="mb-0.5 mr-0.5">Tags:</div>
                    {movie.tags.data.map((t) => (
                      <div key={t._id} className="mb-0.5">
                        <MovieTag tag={t} />
                      </div>
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
