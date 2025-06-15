import React from 'react';
import Logo from './logo/Logo';
import Search from './search/Search';
import ProfileLinks from './profile-links/ProfileLinks';
import './Header.css'

function Header() {
    return (
        <header className="header">
            <Logo />
            <Search />
            <ProfileLinks />
        </header>
    );
}

export default Header;
