/**
 * AddressLink Component
 * 
 * A reusable component that generates a link to Google Maps for a given address.
 * It displays the address as a link and includes a small map icon.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The address text to display as the link.
 * @param {string} [props.className=null] - The optional CSS class for the link.
 * 
 * @returns {ReactElement} The rendered AddressLink component.
 */
export default function AddressLink({ children, className = null }) {

    // Set default className if not provided
    if (!className) {
        className = 'my-3 block';
    }
    // Append additional CSS classes
    className += ' flex gap-1 font-semibold underline';
    
    // Render the address link with Google Maps URL and icon
    return (
        <a className={className} target="_blank" href={'https://maps.google.com/?q=' + children}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>

            {children}
        </a>
    );
}
