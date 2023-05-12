import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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

    async function addPhotoWithLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-with-link', { link: photoLink });
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    return (
        <div>
            {action !== 'new' && (

                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {beforeInput('Title', 'Title for your place. Advertise it.')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, example: My appartment" />

                        {beforeInput('Address', 'Address for this place.')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                        {beforeInput('Photos', 'Add as many as you like.')}

                        <div className="flex gap-2">
                            <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}
                                type='text' placeholder={'Add using a link...'} />
                            <button onClick={addPhotoWithLink} className="bg-gray-200 px-4 rounded-2xl">Add Photo</button>
                        </div>

                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className="rounded-3xl" src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div>
                            ))}
                            <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>

                                Upload
                            </button>
                        </div>

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
            )}

        </div>
    );
}