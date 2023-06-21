/**
 * Render an image of a place.
 *
 * @param {Object} place - The place object containing photo information.
 * @param {number} index - The index of the photo to display (default: 0).
 * @param {string} className - The CSS class name for the image (default: null).
 * @returns {JSX.Element | string} - The rendered image element or an empty string if no photos are available.
 */
export default function PlaceImg({ place, index = 0, className = null }) {
    // If there are no photos in the place object, return an empty string
    if (!place.photos?.length) {
        return '';
    }

    // If className is not provided, set it to 'object-cover'
    if (!className) {
        className = 'object-cover';
    }

    // Render the image with the specified className and source URL
    return (
        <img className={className} src={'http://localhost:4000/uploads/' + place.photos[index]} alt="" />
    );
}
