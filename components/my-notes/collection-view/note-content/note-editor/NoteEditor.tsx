import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export interface Props {
  markdownText: string;
}

const NoteEditor = ({ markdownText }: Props): JSX.Element => {
  const [value, setValue] = useState<string | undefined>(markdownText);

  return (
    <div data-color-mode="dark">
      <div className="wmde-markdown-var">
        <MDEditor value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default NoteEditor;
