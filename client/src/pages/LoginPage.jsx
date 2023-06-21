import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

/**
 * LoginPage Component
 *
 * This component represents the login page, allowing users to authenticate
 * by providing their email and password. Upon successful login, the user
 * is redirected to the homepage. If the user is already authenticated,
 * they will be redirected to the homepage automatically.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  /**
   * Handles the form submission when the user attempts to log in.
   * Makes a POST request to the server with the provided email and password.
   * If the login is successful, the user is set in the UserContext and
   * redirected to the homepage. Otherwise, an error message is displayed.
   * 
   * @param {Event} ev - The form submission event.
   */
  async function loginSubmissionHandler(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      alert('Login Successful');
      setRedirect(true);
    } catch (error) {
      alert('Login Failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginSubmissionHandler}>
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?{" "}
            <Link className="underline text-black" to={"/register"}>
              Click Here To Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
