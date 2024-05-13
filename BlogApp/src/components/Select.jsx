import React, { useId } from 'react';

// Select component takes props such as options, label, className, and other HTML select element props
function Select({ options, label, className = "", ...props }, ref) {
  // Generate a unique id using useId hook
  const id = useId();
  
  // Render the select input element
  return (
    <div className='w-full'>
      {/* If label prop is provided, render a label element */}
      {label && <label htmlFor={id} className=''>{label}</label>}
      {/* Render the select element with provided options */}
      <select
        {...props} // Pass other props to select element
        id={id} // Set the id attribute using the generated id
        ref={ref} // Forward the ref to the select element
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {/* Map over options array and render each option */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// Forward the ref to the Select component using React.forwardRef
export default React.forwardRef(Select);

