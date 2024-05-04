
//Accept properties(props) as a parameters:-
function Button({
    //Also known as 'children' in a programming.
buttonText,
type = 'button',
bgColor = 'bg-blue-600',
textColor = 'text-white',
className ='',
...props
}) {
  return (
    //Adding variables into the className that we have created in a properties in a paramter of a Button.
    <Button className={`px-4 py-2 rounded-lg ${bgColor} ${className} ${type} ${textColor}`} {...props}>{buttonText}</Button>
  )
}

export default Button