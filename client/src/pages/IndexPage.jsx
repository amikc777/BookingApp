import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/**
 * IndexPage Component
 *
 * This component displays a grid of places fetched from an API.
 * Each place is represented by an image, address, title, and price per night.
 * Clicking on a place navigates the user to a detailed view of that place.
 */
export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Fetch places data from the API
    axios.get('/places').then(response => {
      // Update the places state with the fetched data
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-col-4">
      {/* Iterate over the places array and render each place */}
      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {/* Display the first photo of the place if available */}
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold"> ${place.price} Per Night </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
