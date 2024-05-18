import React, { useId } from 'react';

function Select({ options, label, className, ...props }, ref) {
    const id = useId(); // Generate a unique ID for the select element

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''>{label}</label>} {/* Render label if provided */}
            <select
                {...props} // Spread any additional props onto the select element
                id={id} // Set the generated ID to the select element
                ref={ref} // Forward the ref to the select element
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Set the class names for styling
            >
                {options?.map((option) => (
                    <option key={option} value={option}> {/* Map over the options array and create an option element for each */}
                        {option} {/* Set the option text */}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select); // Use React.forwardRef to forward refs to the Select component
