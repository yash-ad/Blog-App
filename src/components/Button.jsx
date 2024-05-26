function Button({
  children, // Text displayed inside the button
  type = 'button', // Type of button (default is 'button')
  bgColor = 'bg-blue-600', // Background color of the button (default is blue)
  textcolor = 'text-white', // Text color of the button (default is white)
  className = '', // Additional classes for styling
  ...props // Other props passed to the button element
}) {
  return (
    <button
      className={`px-2 py-1 rounded-lg ${bgColor} ${textcolor} ${className}`} // Concatenating classes for styling using template literals
      {...props} // Spread other props to the button element
    >
      {children} 
    </button>
  )
}

export default Button // Exporting the Button component
