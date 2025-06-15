import React from 'react';
import './board-menu.css';
import { Link } from "react-router-dom";

function BoardMenu() {
  return (
    <div className="board-menu">
      <h1>Board Menu</h1>
      <ul>
        <li><Link to="/board/4">Game Of Thrones</Link></li>
        <li><Link to="/board/2">Film General</Link></li>
        <li><Link to="/board/3">Soapbox</Link></li>
        <li><Link to="/board/1">General</Link></li>
      </ul>
    </div>
  );
}

export default BoardMenu;
