import { Box } from "@chakra-ui/react";
import { EditorState } from "@codemirror/state";
import { useCallback, useEffect, useState } from "react";
import { useAutosave } from "react-autosave";
import { AnyVariables, UseMutationState } from "urql";
import {
  Collection,
  UpdateNoteMutation,
  useCollectionsQuery,
  useUpdateNoteMutation,
} from "../../../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../../../utils/hooks/useAllLocalStorageValues";
import useCodeMirror from "../../../../../utils/hooks/useCodeMirror";
import { useHandleCrossEditing } from "../../../../../utils/hooks/useHandleCrossEditing";
import { useUpdateItem } from "../../../../../utils/hooks/useUpdateItem";

const NoteEditor = ({
  markdownText,
  handleChange,
}: {
  markdownText: string;
  handleChange: ((_: EditorState) => void) | undefined;
}): JSX.Element => {
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

export interface Props {
  markdownText: string;
}

const NoteEditorContainer = ({ markdownText }: Props): JSX.Element => {
  const {
    note: { note },
  } = useAllLocalStorageValues();
  const [collectionsResult] = useCollectionsQuery();
  const [, updateNote] = useUpdateNoteMutation();
  const [updateItem] = useUpdateItem();
  const [savingState, setSavingState] = useState<
    "processing" | "saving" | "saved" | "error"
  >("saved");
  const [text, setText] = useState(markdownText);
  const collections = collectionsResult.data?.collections as Collection[];
  const handelCrossEditing = useHandleCrossEditing({ collections });

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
    setSavingState("saving");
    const { notesCollection, notesNotesList } = handelCrossEditing();
    const result = (await updateItem(
      "note",
      {
        noteLocation: {
          collectionId: notesCollection.id,
          listId: notesNotesList.id,
          noteId: note.id,
        },
        noteInput: {
          body,
        },
      },
      updateNote
    )) as UseMutationState<UpdateNoteMutation, AnyVariables>;
    if (result?.data?.updateNote) {
      console.log("saved");
      setSavingState("saved");
    } else {
      console.log("error");
      setSavingState("error");
    }
  };

  useAutosave({ data: text, onSave });

  return (
    <Box>
      {savingState}
      <NoteEditor markdownText={markdownText} handleChange={handleChange} />
    </Box>
  );
};

export default NoteEditorContainer;
