import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./header/Header"
import BoardMenu from "./board-menu/BoardMenu";
import Board from "./board/Board"; 
import Thread from "./board/thread-table/thread/Thread";
import Post from "./board/thread-table/thread/post/Post";
import './Content.css';

function Content() {
    return (
        <div className="content">
        <Router>
            <Header />
            <Routes>
                {/* Default Route */}
                <Route path="/" element={<BoardMenu />} />

                {/* Dynamic Board Routes */}
                <Route path="/board/:boardId" element={<Board />} />
                <Route path="/thread/:threadId" element={<Thread />}/>
                <Route path="/thread/posts/:threadId" element={<Post />}/>
            </Routes>
        </Router>
        </div>
    );
}

export default Content;
