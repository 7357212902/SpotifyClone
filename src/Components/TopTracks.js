
import React, { useEffect, useState, useRef } from "react";
import { FaRegClock } from "react-icons/fa";
import "../styles/AudioList.css";
import MusicPlayer from "./MusicPlayer";
import {Songs2} from "./Songs2";

function TopTracks({ setCurrentSong, searchTerm, currentSongIndex }) {
  const [songs, setSongs] = useState(Songs2);
  const [song, setSong] = useState(songs[0]);
  const [img, setImage] = useState(songs[0]?.imgSrc || '');
  const [auto, setAuto] = useState(false);
  const songRefs = useRef([]);

  useEffect(() => {
    const allSongs = document.querySelectorAll(".songs");
    function changeActive() {
      allSongs.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allSongs.forEach((n) => n.addEventListener("click", changeActive));
  }, []);

  const setMainSong = (song, index) => {
    if (!song) return;
    setSong(song);
    setImage(song.imgSrc);
    setAuto(true);
    setCurrentSong(song, index);
    if (songRefs.current[index]) {
      songRefs.current[index].scrollIntoView({ behavior: "smooth" });
      songRefs.current[index].focus();
    }
  };

  // Ensure searchTerm has a default value
  const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

  const filteredSongs = songs.filter((song) =>
    song.songName.toLowerCase().includes(normalizedSearchTerm)
  );

  return (
    <div className="container">
      <div className="left-column">
        <div className="songsContainer">
          {filteredSongs &&
            filteredSongs.map((song, index) => (
              <div
                className={`songs ${index === currentSongIndex ? "active" : ""}`}
                key={song.id}
                onClick={() => setMainSong(song, index)}
                ref={(el) => (songRefs.current[index] = el)}
                tabIndex="0"
              >
                <div className="song">
                  <div className="imgBox">
                    <img
                      src={song.imgSrc}
                      alt={song.songName}
                    />
                  </div>
                  <div className="section">
                    <p className="name">{song.songName}</p>
                    <p><span className="songSpan">{song.artist}</span></p>
                    <div className="hits">
                      <p className="duration">
                        <i>
                          <FaRegClock />
                        </i>
                        {song.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="right-column">
        {song && (
          <div className="right-column">
            <MusicPlayer
              song={song.song}
              imgSrc={song.imgSrc}
              auto={true}
              songs={songs}
              currentIndex={currentSongIndex}
              setCurrentSong={setMainSong}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TopTracks;
