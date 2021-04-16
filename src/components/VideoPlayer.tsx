import React from 'react';
import videojs from 'video.js';

interface VideoPlayerProps {
  onCaptureTimeStamp?: (ts: number) => void;
  sources: {
    src: string;
    type: string;
  }[];
}

const options = {
  fill: true,
  fluid: true,
  responsive: true,
  preload: 'auto',
  controls: true,
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  sources,
  onCaptureTimeStamp,
}) => {
  const videoRef = React.useRef(null);
  const [player, setPlayer] = React.useState(null);

  React.useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, options);
    setPlayer(vjsPlayer);

    return () => vjsPlayer.dispose();
  }, []);

  React.useEffect(() => {
    if (player !== null) {
      player.src(sources);
    }
  }, [sources, player]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default VideoPlayer;
