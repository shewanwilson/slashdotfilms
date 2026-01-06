import React from 'react';
import LastPostTime from './LastPostTime';
import { Link } from "react-router-dom";
import './Thread.css';


function Thread(threadData) {

    var ThreadStyleClass = threadData.index %2===0 ? 'thread even':'thread odd';
    var LinkBackToBoardMenu = `/thread/posts/${threadData.threadId}`;

    return (<div className={ThreadStyleClass}>
        <span className='thread-title'>
            <Link to={LinkBackToBoardMenu}>{threadData.title}</Link>
        </span>
        <span>{threadData.startedBy}</span>
        <span>{threadData.numberOfPosts}</span>
        <span>{<LastPostTime 
                timeOfLastPost={threadData.timeOfLastPost}
                />}
        </span>
    </div>);

}
export default Thread;