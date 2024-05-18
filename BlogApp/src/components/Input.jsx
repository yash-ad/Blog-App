import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId(); // Generate a unique ID for the input element
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='inline-block mb-1 pl-1' 
                    htmlFor={id}>
                    {label} {/* Render label if provided */}
                </label>
            )}
            <input
                type={type} // Set the input type
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Set class names for styling
                ref={ref} // Forward the ref to the input element
                {...props} // Spread any additional props onto the input element
                id={id} // Set the generated ID to the input element
            />
        </div>
    );
});

export default Input;
