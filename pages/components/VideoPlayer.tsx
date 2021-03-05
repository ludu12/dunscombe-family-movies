import React from 'react';
import videojs from 'video.js';

interface VideoPlayerProps {
    src: string,
    type?: string
}

const options = {
    fill: true,
    fluid: true,
    responsive: true,
    preload: 'auto',
    controls: true,
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({src, type = 'video/mp4'}) => {
    const videoRef = React.useRef(null);
    const [player, setPlayer] = React.useState(null);

    React.useEffect(() => {
        const vjsPlayer = videojs(videoRef.current, options);
        setPlayer(vjsPlayer);

        return () => vjsPlayer.dispose();
    }, []);

    React.useEffect(() => {
        if (player !== null) {
            player.src({src, type});
        }
    }, [src, type, player]);
    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js"/>
        </div>
    );
};

export default VideoPlayer;
