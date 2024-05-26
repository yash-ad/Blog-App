import { forwardRef, useId } from 'react'; // Importing forwardRef and useId hooks from React

// Defining the Select component with forwardRef to access the DOM element
function Select({ options, label, className = '', ...props }, ref) {
  const id = useId(); // Generating a unique ID for the select element using useId hook

  return (
    <>
      <div className="w-full">
        {/* Rendering the label if provided */}
        {label && <label htmlFor={id} className=""> </label>}
        
        {/* Rendering the select element */}
        <select
          {...props} // Passing all props to the select element
          id={id} // Setting the id attribute of the select element
          ref={ref} // Assigning the ref to the select element for forwardRef
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Setting the class names for styling
        >
          {/* Mapping through the options array to render each option */}
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default forwardRef(Select); // Exporting the Select component with forwardRef
