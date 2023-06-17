import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

// Component for displaying the booking page
export default function BookingPage() {
    // Retrieve the 'id' parameter from the URL
    const { id } = useParams();

    // State variable to store the booking data
    const [booking, setBooking] = useState(null);

    // Fetch the booking data when the component mounts or when the 'id' parameter changes
    useEffect(() => {
        if (id) {
            // Send a GET request to retrieve the bookings
            axios.get('/bookings').then(response => {
                // Find the booking with the matching 'id'
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    // Update the state with the found booking
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    // If the booking data is not available yet, render an empty string
    if (!booking) {
        return '';
    }

    // Render the booking information and details
    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6  rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information</h2>
                    <BookingDates booking={booking} />
                </div>

                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total Price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}
