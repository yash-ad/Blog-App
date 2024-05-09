import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';


//Take inputs as a props into the parameter of a function called RealTimeEditor().
// What is control? 
//control which comes from react-hook-form it is responsible for controlling the form.
function RealTimeEditor({name,control,label,
    defaultValue="",}) {
  return (
<div className='w-full'>
{label && <label className='inline-block mb-1 pl-1'>{label}</label>}
</div>
  )
}

export default RealTimeEditor