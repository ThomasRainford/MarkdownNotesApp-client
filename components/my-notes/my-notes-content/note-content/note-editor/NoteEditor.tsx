import { Box } from "@chakra-ui/react";
import { EditorState } from "@codemirror/state";
import { useCallback, useEffect, useState } from "react";
import { useAutosave } from "react-autosave";
import { useUpdateNoteMutation } from "../../../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../../../utils/hooks/useAllLocalStorageValues";
import useCodeMirror from "../../../../../utils/hooks/useCodeMirror";
import { useUpdateItem } from "../../../../../utils/hooks/useUpdateItem";

interface NoteEditorProps {
  markdownText: string;
  handleChange: ((state: EditorState) => void) | undefined;
}

const NoteEditor = ({
  markdownText,
  handleChange,
}: NoteEditorProps): JSX.Element => {
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: markdownText,
    onChange: handleChange,
  });

  const replaceEditorContent = useCallback(
    (text: string) => {
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
    },
    [editorView]
  );

  useEffect(() => {
    if (editorView) {
      replaceEditorContent(markdownText);
    }
  }, [editorView, markdownText, replaceEditorContent]);

  return (
    <Box
      ref={refContainer}
      className="note-editor-content"
      h={"calc(100% - 120px)"}
      overflowY={"scroll"}
    />
  );
};

interface NoteEditorContainerProps {
  markdownText: string;
}

const NoteEditorContainer = ({
  markdownText,
}: NoteEditorContainerProps): JSX.Element => {
  const {
    collection: { collection },
    list: { list },
    note: { note },
  } = useAllLocalStorageValues();
  const [, updateNote] = useUpdateNoteMutation();
  const [updateItem] = useUpdateItem();

  const [text, setText] = useState(markdownText);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleChange = useCallback(
    async (state: EditorState) => {
      handleTextChange(state.doc.toString());
    },
    [handleTextChange]
  );

  const onSave = async (body: string) => {
    const result = await updateItem(
      "note",
      {
        noteLocation: {
          collectionId: collection.id,
          listId: list.id,
          noteId: note.id,
        },
        noteInput: {
          body,
        },
      },
      updateNote
    );
    console.log(result);
  };

  useAutosave({ data: text, onSave });

  return <NoteEditor markdownText={markdownText} handleChange={handleChange} />;
};

export default NoteEditorContainer;
