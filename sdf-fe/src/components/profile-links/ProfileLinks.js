import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import './ProfileLinks.css';

function ProfileLinks({ isSignedIn, onLogout }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate("/"); // go to BoardMenu 
    }
    return (
        <div className="profile-links">
            {!isSignedIn ? (
                <Link to="/login" className="login-link">
                    Login
                </Link>
            ) : (
                <>
                    <img
                        src="https://ui-avatars.com/api/?name=Dragon+Queen&background=0D8ABC&color=fff"
                        alt="Profile"
                        className="profile-avatar"
                    />
                    <button
                        className="logout-link"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
}

export default ProfileLinks;
