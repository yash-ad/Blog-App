export default function Button({
    children, // Button text or elements
    type = "button", // Default button type
    bgColor = "bg-blue-600", // Default background color
    textColor = "text-white", // Default text color
    className = "", // Additional custom classes
    ...props // Other props passed to the button
}) {
    return (
        <button 
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} 
            {...props} // Spread the additional props onto the button
        >
            {children} {/* Render button text or elements */}
        </button>
    );
}
