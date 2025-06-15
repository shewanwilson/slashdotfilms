import React from 'react';
import './ProfileLinks.css'

// Example: you can pass this as a prop or manage it globally
const isSignedIn = true; // <-- change this to true to test signed-in state

function ProfileLinks() {
    return (
        <div className="profile-links">
            {!isSignedIn ? (
                // Signed out: show login icon or link
                <button className="login-link">
                    Login
                </button>
            ) : (
                // Signed in: show avatar and/or links
                <>
                    <img
                        src="https://ui-avatars.com/api/?name=Barry+Wilson&background=0D8ABC&color=fff"
                        alt="Profile"
                        className="profile-avatar"
                    />
                    <button className="logout-link">
                        Logout
                    </button>
                </>
            )}
        </div>
    );
}

export default ProfileLinks;
