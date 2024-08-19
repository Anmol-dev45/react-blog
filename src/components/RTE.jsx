import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";
const RTE = ({
  name = "content",
  control,
  label,
  defaultValue = "This is the initial content of the editor",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={config.tinyMCEApiKey}
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: false,
              plugins: [
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
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
