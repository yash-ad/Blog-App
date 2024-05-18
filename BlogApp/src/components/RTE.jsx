import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>} {/* Render label if provided */}

      <Controller
        name={name || "content"} // Use provided name or default to "content"
        control={control} // React Hook Form control object
        render={({ field: { onChange } }) => (
          <Editor
          apiKey='x3jm9ayergddlj0nb1ahmml1iv3lta461nsktbjocr8hv7td'

            initialValue={defaultValue} // Set initial value of the editor
            init={{
              initialValue: defaultValue, // Initial content of the editor
              height: 500, // Set the height of the editor
              menubar: true, // Display the menubar
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "image",
                "charmap", "preview", "anchor", "searchreplace", "visualblocks",
                "code", "fullscreen", "insertdatetime", "media", "table",
                "code", "help", "wordcount", "anchor"
              ], // List of plugins to include
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help", // Toolbar configuration
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }" // Content style
            }}
            onEditorChange={onChange} // Handle editor content change
          />
        )}
      />
    </div>
  );
}
