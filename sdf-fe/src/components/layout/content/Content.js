import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./header/Header";
import BoardMenu from "./board-menu/BoardMenu";
import Board from "./board/Board"; 
import Thread from "./board/thread-table/thread/Thread";
import NewThread from "./board/thread-table/thread/NewThread";
import Post from "./board/thread-table/thread/post/Post";
import LoginForm from "./login/LoginForm";
import './Content.css';

function Content() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    // Restore login state on refresh
    useEffect(() => {
        const signedIn = localStorage.getItem("isSignedIn") === "true";
        setIsSignedIn(signedIn);
    }, []);

    return (
        <div className="content">
            <Router>
                <Header
                    isSignedIn={isSignedIn}
                    onLogout={() => {
                        localStorage.removeItem("isSignedIn");
                        setIsSignedIn(false);
                    }}
                />

                <Routes>
                    <Route path="/" element={<BoardMenu />} />
                    <Route
                        path="/board/:boardId"
                        element={
                            <Board isSignedIn={isSignedIn} />
                        }
                        />
                    <Route path="/thread/new/:boardId" element={<NewThread />}/>    
                    <Route path="/thread/:threadId" element={<Thread />} />
                    <Route path="/thread/posts/:threadId" element={<Post />} />

                    <Route
                        path="/login"
                        element={
                            isSignedIn ? (
                            <Navigate to="/" replace />
                            ) : (
                            <LoginForm setIsSignedIn={setIsSignedIn} />
                            )
                        }
                        />

                </Routes>
            </Router>
        </div>
    );
}

export default Content;
