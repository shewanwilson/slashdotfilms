import React from 'react';
import './Layout.css';
import './content/Content.js';
import Content from './content/Content.js';

function Layout() {
    return( <div className="outer">
        <Content />
    </div>
    )
}
export default Layout;