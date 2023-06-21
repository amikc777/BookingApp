import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

/**
 * Component for creating or editing a place.
 * Retrieves place data if an ID is provided in the URL params.
 * Saves the place data to the server when the form is submitted.
 * Redirects to the account places page upon successful save.
 */
export default function PlacesFormPage() {
    const { id } = useParams();
    // console.log({id});

    // State variables for form inputs
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // Fetch place data if an ID is provided
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id])

    /**
     * Returns a styled header element for the form input.
     * @param {string} text - The header text.
     * @returns {JSX.Element} - The styled header element.
     */
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    /**
     * Returns a styled description paragraph for the form input.
     * @param {string} text - The description text.
     * @returns {JSX.Element} - The styled description paragraph.
     */
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    /**
     * Returns a combination of header and description elements for the form input.
     * @param {string} header - The header text.
     * @param {string} description - The description text.
     * @returns {JSX.Element} - The combination of header and description elements.
     */
    function beforeInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    /**
     * Saves the place data to the server.
     * Updates an existing place if an ID is provided, otherwise creates a new place.
     * Sets the redirect state to true upon successful save.
     * @param {Event} ev - The form submit event.
     */
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price,
        };
        if (id) {
            // update existing place
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            // create new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    // Redirect to the account places page if redirect state is true
    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {beforeInput('Title', 'Title for your place. Advertise it.')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, example: My apartment" />

                {beforeInput('Address', 'Address for this place.')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                {beforeInput('Photos', 'Add as many as you like.')}

                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {beforeInput('Description', 'Description of place.')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                {beforeInput('Perks', 'Select the perks your place offers.')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {beforeInput('Extra Info', 'Rules of the house, etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {beforeInput('Check-In/Check-Out Times', 'Add times. Remember to leave some time in between for cleaning up the room for the next guests.')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check In Time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="7" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out Time</h3>
                        <input type="text" value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="12" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max Num Of Guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Price Per Night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    );
}
