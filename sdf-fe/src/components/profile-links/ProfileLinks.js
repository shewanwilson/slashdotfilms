import React from 'react';
import { Link } from "react-router-dom";
import './ProfileLinks.css';

function ProfileLinks({ isSignedIn, onLogout }) {
    return (
        <div className="profile-links">
            {!isSignedIn ? (
                <Link to="/login" className="login-link">
                    Login
                </Link>
            ) : (
                <>
                    <img
                        src="https://ui-avatars.com/api/?name=Barry+Wilson&background=0D8ABC&color=fff"
                        alt="Profile"
                        className="profile-avatar"
                    />
                    <button
                        className="logout-link"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
}

export default ProfileLinks;
