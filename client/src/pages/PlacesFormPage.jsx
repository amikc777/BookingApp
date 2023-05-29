import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";

export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);

    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function beforeInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        });
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={addNewPlace}>
                {beforeInput('Title', 'Title for your place. Advertise it.')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, example: My appartment" />

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
                <div className="grid gap-2 sm:grid-cols-3">
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
                </div>
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    );
}