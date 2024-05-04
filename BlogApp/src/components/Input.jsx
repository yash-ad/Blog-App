
import React, { useId } from "react";


//Introducing 'forwardRef' A React hook this is used for it allows parent components to move or forward references to their children.
//It gives a children component a reference to DOM entity created by its parent component in react.
//while this helps the children to read and modify the element from any location where it is used.
const Input = React.forwardRef(function Input({
label,
type='text',
className='',
...props
},ref){
    const id = useId()
return(
   <div className="w-full">
   {/* //Lets start here classic Javascript */}
   
{/* //If there is a 'label' its passed and is 'true' then show label component */}
{label && <label
    className="inline-block mb-1 pl-1"
      //Unique generated from label htmlFor Id
    htmlFor={id}>
    {label}
</label>
}
<input
    type={type}
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    {...props}
    //Here 'ref' used as a prop, to take and give reference from parent component.
    ref={ref}
    //Unique generated  to an input specific is from label Id
    id={id}
/>
   </div> 
)
})

export default Input;