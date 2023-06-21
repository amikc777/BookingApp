// Import necessary modules and components
import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

// Set the default base URL and enable sending cookies with requests
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

// Main App component
function App() {
  // Render the application
  return (
    <UserContextProvider> {/* Wrap the application with UserContextProvider for managing user context */}
      <Routes> {/* Define the routing for different pages */}
        <Route path="/" element={<Layout />}> {/* Main route with a Layout component */}
          <Route index element={<IndexPage />} /> {/* Render IndexPage component for the main route */}
          <Route path="/login" element={<LoginPage />} /> {/* Render LoginPage component for the "/login" route */}
          <Route path="/register" element={<RegisterPage />} /> {/* Render RegisterPage component for the "/register" route */}
          <Route path="/account" element={<ProfilePage />} /> {/* Render ProfilePage component for the "/account" route */}
          <Route path="/account/places" element={<PlacesPage />} /> {/* Render PlacesPage component for the "/account/places" route */}
          <Route path="/account/places/new" element={<PlacesFormPage />} /> {/* Render PlacesFormPage component for the "/account/places/new" route */}
          <Route path="/account/places/:id" element={<PlacesFormPage />} /> {/* Render PlacesFormPage component for the "/account/places/:id" route */}
          <Route path="/place/:id" element={<PlacePage />} /> {/* Render PlacePage component for the "/place/:id" route */}
          <Route path="/account/bookings" element={<BookingsPage />} /> {/* Render BookingsPage component for the "/account/bookings" route */}
          <Route path="/account/bookings/:id" element={<BookingPage />} /> {/* Render BookingPage component for the "/account/bookings/:id" route */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App; // Export the App component as the default export
