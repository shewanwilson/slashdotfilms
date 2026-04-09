import React from 'react';
import { Link } from 'react-router-dom';
import './BreadCrumb.css';


function BreadCrumb({ boardId, boardTitle, threadTitle }) {

    return (
        <div data-testid="thread-breadcrumb" className="breadcrumb">

            <Link to="/">Boards</Link>
            {" / "}

            <Link to={`/board/${boardId}`}>
                {boardTitle}
            </Link>
            {" / "}

            <span>{threadTitle}</span>
                
            

        </div>
    );
}
export default BreadCrumb;