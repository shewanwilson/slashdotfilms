import React from 'react';
import { Link } from "react-router-dom";
import './NewTopicLink.css';


function NewTopicLink ({ isSignedIn, boardId }) {
    
    return(
        
        <div data-testid="new-topic-link" className="new-topic-link">
            {!isSignedIn ? (<p>You must be signed in to make a new topic</p>)
             : (<Link to={`/thread/new/${boardId}`}>Start New Topic</Link>) }
        </div>
    );
}
export default NewTopicLink;