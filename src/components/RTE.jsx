
import { Editor } from '@tinymce/tinymce-react'; // Importing the Editor component from tinymce-react library
import { Controller } from 'react-hook-form'; // Importing the Controller component from react-hook-form library
import conf from '../conf/conf.js';

// Defining the RTE (Realtime Text Editor) component
function RTE({ name, control, label, defaultValue = '' }) {
  // The RTE component receives props like name, control, label, and defaultValue

  return (
    <>
      <div className="w-full">
        {/* If the label is provided  from the prop then render the label*/}
        {label && <label className="inline-block mb-1 pl-1">{label}</label>}

        {/* Using the Controller component from react-hook-form to connect the RTE component with the form */}
        <Controller
          name={name || 'content'} // Setting the name for the controller (default: 'content')
          control={control} // Providing control to the RTE component to handle form state
          render={({ field: { onChange } }) => (
            // Using the render prop of Controller to render the Editor component
            <Editor
            apiKey={conf.tinyMCEApiKey} // Tinymce API key
              initialValue={defaultValue} // Setting the initial value of the editor
              init={{
                initialValue: defaultValue, // Initial value of the editor
                height: 500, // Setting the height of the editor
                menubar: true, // Showing the menubar in the editor
                plugins: [ // List of plugins to be included in the editor
                  'image',
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                  'anchor',
                ],
                toolbar: // Setting the toolbar options for the editor
                  'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style: // Setting the content style for the editor
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={onChange} // Handling editor change events
            />
          )}
        />
      </div>
    </>
  );
}

export default RTE; // Exporting the RTE component as the default export
