import React from 'react';
import VideoPlayer from "./components/VideoPlayer";
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <VideoPlayer src='//vjs.zencdn.net/v/oceans.mp4'/>
            </main>
        </div>
    );
};

export default Home;
