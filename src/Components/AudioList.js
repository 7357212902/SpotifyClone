// import React, { useEffect, useState, useRef } from "react";
// import { FaRegClock } from "react-icons/fa";
// import "../styles/AudioList.css";
// import MusicPlayer from "./MusicPlayer";
// import { Songs } from "./Songs";

// function AudioList({ setCurrentSong, searchTerm, currentSongIndex }) {
//   const [songs, setSongs] = useState(Songs);
//   const [song, setSong] = useState(songs[0]);
//   const [img, setImage] = useState(songs[0]?.cover || '');
//   const [auto, setAuto] = useState(false);
//   const songRefs = useRef([]);

//   useEffect(() => {
//     const allSongs = document.querySelectorAll(".songs");
//     function changeActive() {
//       allSongs.forEach((n) => n.classList.remove("active"));
//       this.classList.add("active");
//     }

//     allSongs.forEach((n) => n.addEventListener("click", changeActive));
//   }, []);

//   const setMainSong = (song, index) => {
//     if (!song) return;
//     setSong(song);
//     setImage(song.cover);
//     setAuto(true);
//     setCurrentSong(song, index);
//     if (songRefs.current[index]) {
//       songRefs.current[index].scrollIntoView({ behavior: "smooth" });
//       songRefs.current[index].focus();
//     }
//   };

//   const filteredSongs = songs.filter((song) =>
//     song.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container">
//       <div className="left-column">
//         <div className="songsContainer">
//           {filteredSongs &&
//             filteredSongs.map((song, index) => (
//               <div
//                 className={`songs ${index === currentSongIndex ? "active" : ""}`}
//                 key={song.id}
//                 onClick={() => setMainSong(song, index)}
//                 ref={(el) => (songRefs.current[index] = el)}
//                 tabIndex="0"
//               >
//                 <div className="song">
//                   <div className="imgBox">
//                     <img
//                       src={`https://cms.samespace.com/assets/${song.cover}`}
//                       alt={song.name}
//                     />
//                   </div>
//                   <div className="section">
//                     <p className="name">{song.name}</p>
//                     <p><span className="songSpan">{song.artist}</span></p>
//                     <div className="hits">
//                       <p className="duration">
//                         <i>
//                           <FaRegClock />
//                         </i>
//                         {song.time}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//       <div className="right-column">
//         {song && (
//           <div className="right-column">
//             <MusicPlayer
//               song={song.url}
//               imgSrc={`https://cms.samespace.com/assets/${song.cover}`}
//               auto={true}
//               songs={songs}
//               currentIndex={currentSongIndex}
//               setCurrentSong={setMainSong}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AudioList;

import React, { useEffect, useRef } from "react";
import { FaRegClock } from "react-icons/fa";
import "../styles/AudioList.css";
import MusicPlayer from "./MusicPlayer";
import { Songs } from "./Songs"; // Assuming Songs is correctly imported

function AudioList({ setCurrentSong, searchTerm, currentSongIndex }) {
  const songRefs = useRef([]);

  useEffect(() => {
    const allSongs = document.querySelectorAll(".songs");
    function changeActive() {
      allSongs.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allSongs.forEach((n) => n.addEventListener("click", changeActive));

    return () => {
      // Cleanup event listeners when component unmounts
      allSongs.forEach((n) => n.removeEventListener("click", changeActive));
    };
  }, []);

  const setMainSong = (song, index) => {
    if (!song) return;

    setCurrentSong(song, index);

    if (songRefs.current[index]) {
      songRefs.current[index].scrollIntoView({ behavior: "smooth" });
      songRefs.current[index].focus();
    }
  };

  const filteredSongs = Songs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="left-column">
        <div className="songsContainer">
          {filteredSongs.map((song, index) => (
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
                    src={`https://cms.samespace.com/assets/${song.cover}`}
                    alt={song.name}
                  />
                </div>
                <div className="section">
                  <p className="name">{song.name}</p>
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
        {currentSongIndex !== null && (
          <MusicPlayer
            song={filteredSongs[currentSongIndex].url}
            imgSrc={`https://cms.samespace.com/assets/${filteredSongs[currentSongIndex].cover}`}
            auto={true} // Adjust this based on your logic
            songs={filteredSongs}
            currentIndex={currentSongIndex}
            setCurrentSong={setCurrentSong}
          />
        )}
      </div>
    </div>
  );
}

export default AudioList;

