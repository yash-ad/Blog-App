// Define a functional component named Container that takes children as props.
function Container({ children }) {
  // Return a div element with specified classNames and children
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  );
}

// Export the Container component as default
export default Container;
