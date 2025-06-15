import React from 'react';
import LastPostTime from './LastPostTime';
import { Link } from "react-router-dom";
import './Thread.css';


function Thread(threadData) {

    return (<div className={threadData.index %2===0 ? 'thread even':'thread odd'}>
        <span className='thread-title'>
            <Link to={`/thread/posts/${threadData.threadId}`}>{threadData.title}</Link>
        </span>
        <span>{threadData.startedBy}</span>
        <span>{threadData.numberOfPosts}</span>
        <span>{<LastPostTime 
                threadData={threadData.timeOfLastPost}
                />}
        </span>
    </div>);

}
export default Thread;