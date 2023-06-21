import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

/**
 * ProfilePage component displays the user's profile information and provides options for logging out and navigating to different subpages.
 */
export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    // Get the current subpage from the URL parameters
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    /**
     * Performs the logout action by sending a request to the server to invalidate the user's session.
     * Clears the user context and sets the redirect path to the homepage.
     */
    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    // If the user context is not ready, display a loading message
    if (!ready) {
        return 'Loading...';
    }

    // If the user is not logged in and there is no redirect path, navigate to the login page
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    // If there is a redirect path, navigate to that path
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    {/* Display user profile information */}
                    Logged in as {user.name} ({user.email})<br />
                    {/* Logout button */}
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                // Render PlacesPage component for the 'places' subpage
                <PlacesPage />
            )}
        </div>
    );
}
