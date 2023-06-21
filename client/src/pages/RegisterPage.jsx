import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * RegisterPage component allows users to register by providing their name, email, and password.
 * On successful registration, the user is redirected to the login page.
 */
export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handles the registration process when the form is submitted.
     * Sends a POST request to the server with user registration data.
     * Displays an alert on successful registration or failure.
     * @param {Event} ev - The form submit event.
     */
    async function registerUser(ev) {
        ev.preventDefault();

        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration complete. Please login.');
            
        } catch (error) {
            alert('Registration failed. Please try again at a later time.');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="user@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already Registered? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
