import React from 'react';
import videojs, { VideoJsPlayer } from 'video.js';

interface VideoPlayerProps {
  setPlayer: (vjsPlayer: VideoJsPlayer) => void;
}

const options = {
  fill: true,
  fluid: true,
  responsive: true,
  preload: 'auto',
  controls: true,
  // https://github.com/videojs/video.js/issues/6762
  html5: { hls: { overrideNative: true } },
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ setPlayer }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, options);
    setPlayer(vjsPlayer);

    return () => vjsPlayer.dispose();
  }, []);

  return (
    <>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js" />
      </div>
    </>
  );
};

export default VideoPlayer;
