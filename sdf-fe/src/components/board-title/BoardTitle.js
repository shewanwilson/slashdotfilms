import React from 'react';
import './BoardTitle.css';
//import Header from './header/Header.js';

class BoardTitle extends React.Component{
    render(){
        return (<div className="board-title">{this.props.title}</div>)
    }
}
export default BoardTitle;