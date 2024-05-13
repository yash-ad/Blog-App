import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// RealTimeEditor component takes props such as name, control, label, and defaultValue
function RealTimeEditor({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {/* If label prop is provided, render a label element */}
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            {/* Use Controller component from react-hook-form to wrap the Editor component */}
            <Controller
                name={name || 'content'}
                control={control}
                // Render prop is used to manage the interaction between Editor component and form state
                render={({ field: { onChange } }) => (
                    // Editor component provided by TinyMCE for rich text editing
                    <Editor
                        // Set initialValue to the provided defaultValue
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link",
                                "image", "charmap", "preview", "anchor", "searchreplace",
                                "visualblocks", "code", "fullscreen", "insertdatetime",
                                "media", "table", "code", "help", "wordcount", "anchor"
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        // onEditorChange event handler to update form state when editor content changes
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}

export default RealTimeEditor;
