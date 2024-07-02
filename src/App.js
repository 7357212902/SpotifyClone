import React from "react";
import "./App.css";
import {LeftMenu} from "./Components/LeftMenu"; 
import MainContainer from "./Components/MainContainer"; 


function App() {
  return (
    <div className="App">
      <div className="left-menu">
        <LeftMenu />
      </div>
      <MainContainer />
      
      <div className="background"></div>
    </div>
  );
}

export default App;

