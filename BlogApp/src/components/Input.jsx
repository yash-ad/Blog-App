import React, { useId } from "react";

// Introducing 'forwardRef' to forward refs from parent to child components
const Input = React.forwardRef(function Input({
    label, // Label for the input field
    type = 'text', // Input type (default: text)
    className = '', // Additional CSS classes for styling
    ...props // Additional props passed to the input element
}, ref) {
    // Generate a unique ID for the input element using the useId hook
    const id = useId();

    return (
        <div className="w-full">
            {/* Render label if provided */}
            {label && (
                <label
                    className="inline-block mb-1 pl-1"
                    htmlFor={id} // Associate label with input using unique ID
                >
                    {label}
                </label>
            )}
            {/* Input element */}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props} // Spread additional props
                ref={ref} // Forward the ref to the input element
                id={id} // Set unique ID for input element
            />
        </div>
    );
});

export default Input;
