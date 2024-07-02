import React, { useState, useRef, useEffect } from "react";
import "../styles/MusicPlayer.css";
// import "../styles/MusicPlayer.css";
import {
 
  FaForward,
  FaStepForward,
  FaStepBackward,
  FaBackward,
  FaPlay,
  FaPause,
  
} from "react-icons/fa";

function MusicPlayer({ song, imgSrc, auto, songs, currentIndex, setCurrentSong }) {
  const [isLove, setLove] = useState(false);
  const [isPlaying, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrenttime] = useState(0);

  const audioPlayer = useRef(); // Reference to our audio component
  const progressBar = useRef(); // Reference to our progress bar
  const animationRef = useRef(); // Reference to our animation

  useEffect(() => {
    if (audioPlayer.current) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    }
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  useEffect(() => {
    if (auto && audioPlayer.current) {
      setPlay(true);
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  }, [song]);

  const changePlayPause = () => {
    const prevValue = isPlaying;
    setPlay(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (!audioPlayer.current) return;
    progressBar.current.value = audioPlayer.current.currentTime;
    changeCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin}:${returnSec}`;
  };

  const changeProgress = () => {
    if (!audioPlayer.current) return;
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    if (!progressBar.current) return;
    progressBar.current.style.setProperty(
      "--played-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrenttime(progressBar.current.value);
  };

 

  const handleNext = () => {
    if (!songs || songs.length === 0) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex], nextIndex);
  };

  const handlePrevious = () => {
    if (!songs || songs.length === 0) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex], prevIndex);
  };

  return (
    <div className="musicPlayer">
      <div className="songImage">
        <img src={imgSrc} alt="" />
      </div>
      <div className="songAttributes">
        <audio src={song} preload="metadata" ref={audioPlayer} />

        <div className="top">
          <div className="left">
           
          </div>

          <div className="middle">
            <div className="back">
              <i onClick={handlePrevious}>
                <FaStepBackward />
              </i>
              <i onClick={handlePrevious}>
                <FaBackward />
              </i>
            </div>
            <div className="playPause" onClick={changePlayPause}>
              {isPlaying ? (
                <i>
                  <FaPause />
                </i>
              ) : (
                <i>
                  <FaPlay />
                </i>
              )}
            </div>
            <div className="forward">
              <i onClick={handleNext}>
                <FaForward />
              </i>
              <i onClick={handleNext}>
                <FaStepForward />
              </i>
            </div>
          </div>

         
        </div>

        <div className="bottom">
          <div className="currentTime">{calculateTime(currentTime)}</div>
          <input
            type="range"
            className="progressBar"
            ref={progressBar}
            defaultValue="0"
            onChange={changeProgress}
          />
          <div className="duration">
            {duration && !isNaN(duration) ? calculateTime(duration) : "00:00"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
