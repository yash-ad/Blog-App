
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';


// It takes several props as input: name, control, label, and defaultValue.
// What is control? 
//control which comes from react-hook-form it is responsible for controlling the form.
function RealTimeEditor({name,control,label,
    defaultValue="",}) {
  return (
<div className='w-full'>
{/*Within the JSX, it checks if a label prop is provided. If it is, it renders a label element. */}
{label && <label className='inline-block mb-1 pl-1'>{label}</label>}
{/*Then it uses the Controller component from react-hook-form to wrap the Editor component. */}
{/* The Controller component manages the interaction between the Editor component and the form's state managed by react-hook-form. */}
<Controller
name={name || 'content'}
control={control}
render={({field:{onChange}})=>(
  // The Editor component is the actual rich text editor provided by TinyMCE.
    <Editor
    //The initialValue prop is set to the provided defaultValue, which is either an empty string or a default value specified by the parent component.
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
//The onEditorChange event handler is provided, which will be called whenever the 
//content of the editor changes. Inside this handler, it invokes the onChange function provided by Controller      
// ensuring that any changes in the editor are reflected in the form's state managed by react-hook-form.      
        onEditorChange={onChange}
        />
)}
/>
</div>
  )
}

export default RealTimeEditor;