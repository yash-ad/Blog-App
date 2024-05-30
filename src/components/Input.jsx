import { forwardRef, useId } from 'react' // Importing necessary hooks from React

const Input = 
forwardRef(
  function Input(
  { label, type = 'text', className = '', ...props }, // Destructuring props including label, type, className, and other props
  ref, // A reference to the input element,forwarded by the forwardRef function.
) {
  const id = useId() // Generating a unique ID for the input element using the useId hook
  
  return (
    <>
     {/* Width full div wrapper */}
      <div className="w-full">
      {/* If the label prop is provided  then render a label element. */}
        {label && ( 
          <label className="inline-block mb-1 pl-1" htmlFor={id}> 
            {label}
          </label>
        )}
        <input
          type={type} // Setting the input type, defaulting to 'text'
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Setting the input element's classes, including default and custom classes provided via props
          ref={ref} // Forwarding the ref to the input element
          {...props} // Passing any additional props to the input element
          id={id} // Assigning the generated ID to the input element
        />
      </div>
    </>
  )
})

export default Input // Exporting the Input component
