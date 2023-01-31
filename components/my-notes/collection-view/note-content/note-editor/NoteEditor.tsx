import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import useCodeMirror from "../../../../../utils/hooks/useCodeMirror";

export interface Props {
  markdownText: string;
}

const NoteEditor = ({ markdownText }: Props): JSX.Element => {
  const [, setText] = useState(markdownText);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleChange = useCallback(
    (state: any) => handleTextChange(state.doc.toString()),
    [handleTextChange]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: markdownText,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
      replaceEditorContent(markdownText);
    }
  }, [editorView, markdownText]);

  const replaceEditorContent = (text: string) => {
    const transaction = editorView?.state.update({
      changes: {
        from: 0,
        to: editorView?.state?.doc.length,
        insert: text,
      },
    });
    if (transaction) {
      editorView?.dispatch(transaction);
    }
  };

  return (
    <Box
      ref={refContainer}
      className="note-editor-content"
      h={"calc(100% - 120px)"}
      overflowY={"scroll"}
    ></Box>
  );
};

export default NoteEditor;
