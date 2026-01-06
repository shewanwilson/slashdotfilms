import React from 'react';
import './ThreadTable.css';
import Thread from "./thread/Thread";

function ThreadTable({ threads = [] }) {
    const threadsArray = Array.isArray(threads) ? threads : [];

    if (threadsArray.length === 0) {
        return <p>No threads found.</p>;
    }

    return (
        <div className="thread-table">
            <div className="thread header">
                <div className="title headers">Thread Title</div>
                <div className="author headers">Started By</div>
                <div className="replies headers">#</div>
                <div className="timestamp headers">Latest Posting</div>
            </div>

            {threads.map((thread, index) => (
                <Thread
                    key={thread.thread_id}
                    index={index}
                    threadId = {thread.thread_id}
                    title={thread.thread_title}
                    startedBy={thread.started_by} 
                    numberOfPosts={thread.no_of_posts}    
                    timeOfLastPost={thread.time_of_last_post}
                />
            ))}
        </div>
    );
}

export default ThreadTable;
