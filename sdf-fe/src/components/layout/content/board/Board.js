import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Board.css';
import NewTopicLink from './new-topic-link/NewTopicLink';
import Pagination from './pagination/Pagination';
import ThreadTable from './thread-table/ThreadTable';

const boardTitles = {
    1: 'General',
    2: 'Film General',
    3: 'Soapbox',
    4: 'Game Of Thrones',
};

function Board({ isSignedIn, onLogout }) {
    const { boardId } = useParams();
    const title = boardTitles[boardId] || "Board";

    const [threads, setThreads] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/threads/${boardId}`)
            .then(res => res.json())
            .then(data => setThreads(data))
            .catch(err => console.error("Failed to fetch threads:", err));
    }, [boardId]);

    return (
        <div className="board">
            <Link to="/">← Back to Board Menu</Link>
            <p>{title}</p>
            <NewTopicLink isSignedIn={isSignedIn} />
            <Pagination />
            <ThreadTable threads={threads} />
        </div>
    );
}

export default Board;



