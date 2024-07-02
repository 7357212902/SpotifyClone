import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../styles/MainContainer.css";
import { FaUsers } from "react-icons/fa";
import AudioList from "./AudioList";
import TopTracks from "./TopTracks";
import { Songs } from "./Songs";
import {Songs2} from "./Songs2";

function MainContainer() {
  const [currentSong, setCurrentSong] = useState(Songs[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState("#fff");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const allLi = document.querySelector(".menuList").querySelectorAll("li");

    function changePopularActive() {
      allLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allLi.forEach((n) => n.addEventListener("click", changePopularActive));
  }, []);

  useEffect(() => {
    if (currentSong) {
      setBackgroundGradient(currentSong.accent);
    }
  }, [currentSong]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSetCurrentSong = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
  };

  return (
    <Router>
      <div className="mainContainer">
        <div className="content">
          <div className="menuList">
            <ul>
              <li className="active">
                <Link to="/">For You</Link>
              </li>
              <li>
                <Link to="/top-tracks">Top Tracks</Link>
                {/* <Link to="/">Top Tracks</Link> */}
              </li>
            </ul>
            <p>
              <i>
                <FaUsers />
              </i>
              12.3M <span>Followers</span>
            </p>
          </div>
          <input
            type="text"
            placeholder="Search Song, Artist"
            className="searchBar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <br /><br />
          <Routes>
            <Route path="/" element={
              <AudioList
                setCurrentSong={handleSetCurrentSong}
                songs={Songs}
                searchTerm={searchTerm}
                currentSongIndex={currentSongIndex}
              />
            }/>
            
           <Route path="top-tracks" element={
              <AudioList
                setCurrentSong={handleSetCurrentSong}
                songs={Songs2}
                searchTerm={searchTerm}
                currentSongIndex={currentSongIndex}
              />
            }/> 
           </Routes>
        </div>
      </div>
    </Router>
  );
}

export default MainContainer;

