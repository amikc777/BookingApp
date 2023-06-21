import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create a UserContext using React's createContext() function
export const UserContext = createContext({});

/**
 * UserContextProvider component provides user information to its children components through context.
 * It fetches the user profile data from the server using Axios and sets it in the context state.
 * @param {Object} children - The child components that will consume the UserContext.
 * @returns {JSX.Element} - The UserContextProvider component.
 */
export function UserContextProvider({ children }) {
    // Define state variables using React's useState() hook
    const [user, setUser] = useState(null); // User object
    const [ready, setReady] = useState(false); // Flag indicating if the user data is ready

    // Fetch user profile data from the server when the component mounts
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                // Set the fetched user data in the state
                setUser(data);
                // Set the ready flag to indicate that user data is available
                setReady(true);
            });
        }
    }, []);

    // Render the UserContext.Provider component and pass the user data and related functions as the value prop
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
