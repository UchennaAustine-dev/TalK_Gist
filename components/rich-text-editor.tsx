"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({
  initialValue = "",
  onChange,
}: RichTextEditorProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (content: string) => {
    setValue(content);
    onChange(content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={modules}
      className="h-64 mb-12"
    />
  );
}
