'use client';

import React from 'react';
import { Movie } from '@/types';
import 'video.js/dist/video-js.css';
import { useVideoJS } from 'react-hook-videojs';

const useMovieSources = (movie: Movie) => {
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

const options = {
  fill: true,
  fluid: true,
  responsive: true,
  preload: 'auto',
  controls: true,
  // https://github.com/videojs/video.js/issues/6762
  html5: { hls: { overrideNative: true } },
};

export function MoviePlayer({ movie }: { movie: Movie }) {
  const sources = useMovieSources(movie);

  const { Video } = useVideoJS({ ...options, sources });

  return (
    <div className={'min-h-0 min-w-0'}>
      <Video />
    </div>
  );
}
