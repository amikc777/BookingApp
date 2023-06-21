import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

/**
 * BookingWidget component renders a booking form for a specific place.
 * It allows users to select check-in and check-out dates, number of guests, and provide their information.
 * Users can book the place by submitting the form.
 *
 * @param {Object} place - The place object containing information about the place being booked.
 * @returns {JSX.Element} - The rendered booking form.
 */
export default function BookingWidget({ place }) {
  // State variables to manage form input values
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // State variable to manage redirection after successful booking
  const [redirect, setRedirect] = useState('');

  // Accessing the user context to pre-fill the name field if a user is logged in
  const { user } = useContext(UserContext);

  /**
   * Updates the name field with the user's name when the user context changes.
   */
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // Calculate the number of nights based on check-in and check-out dates
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  /**
   * Sends a booking request to the server and sets the redirect URL after successful booking.
   */
  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  // Redirect to the booking details page if a redirect URL is set
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>

      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={ev => setNumberOfGuests(ev.target.value)}
            />
          </div>
        </div>

        {/* Render name and phone fields if check-in and check-out dates are selected */}
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
            />

            <label>Phone Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {/* Display the total price if check-in and check-out dates are selected */}
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
