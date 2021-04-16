import React from 'react';
import { Movie } from '../../lib/graphql.generated';

export const useMovieSources = (movie: Movie) => {
  return React.useMemo<{ src: string; type: string }[]>(() => {
    const sources = [];
    if (movie.DASH_URL) {
      sources.push({ src: movie.DASH_URL, type: 'application/dash+xml' });
    }
    if (movie.HLS_URL) {
      sources.push({ src: movie.HLS_URL, type: 'application/x-mpegURL' });
    }
    if (movie.MP4_URL) {
      sources.push({ src: movie.MP4_URL, type: 'video/mp4' });
    }

    return sources;
  }, [movie.DASH_URL, movie.HLS_URL, movie.MP4_URL]);
};
