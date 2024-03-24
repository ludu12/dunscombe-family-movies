'use client';

import React, { useEffect } from 'react';
import { Movie } from '@/types';
import 'video.js/dist/video-js.css';
import { useVideoJS } from 'react-hook-videojs';
import { VideoJsPlayerOptions } from 'video.js';
import videojs from 'video.js';

// Initialize the Chromecast plugin
require('@silvermine/videojs-chromecast')(videojs);
require('@silvermine/videojs-airplay')(videojs);

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

const options: VideoJsPlayerOptions = {
  fill: true,
  fluid: true,
  responsive: true,
  preload: 'auto',
  autoplay: false,
  controls: true,

  userActions: {
    hotkeys: true,
  },
  controlBar: {
    pictureInPictureToggle: false,
  },
  techOrder: ['chromecast', 'html5'], // You may have more Tech, such as Flash or HLS
  plugins: {
    chromecast: {},
  },
  // https://github.com/videojs/video.js/issues/6762
  html5: { hls: { overrideNative: true } },
};

export function MoviePlayer({ movie }: { movie: Movie }) {
  const sources = useMovieSources(movie);

  const { Video, player } = useVideoJS({ ...options, sources });
  useEffect(() => {
    if (player) {
      // @ts-ignore
      player.chromecast();
      // @ts-ignore
      player.airPlay();
    }
  }, [player]);

  return (
    <div className={'min-h-0 min-w-0'}>
      <Video />
    </div>
  );
}
