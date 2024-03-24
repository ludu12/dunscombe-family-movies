import React from 'react';
import { fetchMovie } from '@/lib/data';
import { MoviePlayer } from '@/ui/components/MoviePlayer';

export default async function Page({ params }: { params: { guid: string } }) {
  const movie = await fetchMovie(params.guid);

  return (
    <div className={'prose'}>
      <h2 className="min-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
        {movie.name}
      </h2>
      <h3 className="mb-2 min-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl">
        {movie.shortDescription}
      </h3>
      <div className={'py-4'}>
        <MoviePlayer movie={movie} />
      </div>
      <p className="prose mb-2">{movie.description}</p>
    </div>
  );
}
