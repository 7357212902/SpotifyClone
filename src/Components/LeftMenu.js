import React from "react";
import "../styles/LeftMenu.css";
import { FaSpotify, FaEllipsisH } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import Profile from "../img/profile.png";
function LeftMenu() {
  return (
    <>
    <div className="leftMenu">
      <div className="logoContainer">
        <div className="logo">
          <i>
            <FaSpotify />
          </i>

          <h2>Spotify</h2>
        </div>

      </div>
      <div className="profileImage">
          <img src={Profile} alt="" />
        </div>

      
    </div>
    
   </>
  );
}

export { LeftMenu };
