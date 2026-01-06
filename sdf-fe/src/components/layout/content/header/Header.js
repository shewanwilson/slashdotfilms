import React from 'react';
import Logo from './logo/Logo';
import Search from './search/Search';
import ProfileLinks from './profile-links/ProfileLinks';
import './Header.css'

function Header({ isSignedIn, onLogout }) {
    return (
        <header className="header">
            <Logo />
            <Search />
            <ProfileLinks 
                isSignedIn={isSignedIn}
                onLogout={onLogout}
            />
        </header>
    );
}

export default Header;
