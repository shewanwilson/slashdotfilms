import React from 'react';
import './board-menu.css';
import { Link } from "react-router-dom";

function BoardMenu() {
  return (
    <div className="board-menu">
      <h1 data-testid="board-menu-header">Board Menu</h1>
      <ul data-testid="board-list">
        <li><Link to="/board/1">General</Link></li>
        <li><Link to="/board/2">Film General</Link></li>
        <li><Link to="/board/3">Soapbox</Link></li>
        <li><Link to="/board/4">Game of Thrones</Link></li>
        <li><Link to="/board/5">TV General</Link></li>
        <li><Link to="/board/13">Auto Test Board</Link></li>
      </ul>
    </div>
  );
}

export default BoardMenu;
