import { CheckIcon } from "@chakra-ui/icons";
import { Box, Spinner, Tag } from "@chakra-ui/react";
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

const Editor = ({
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

const SavingTag = ({
  state,
}: {
  state: "processing" | "saving" | "saved" | "error";
}) => {
  switch (state) {
    case "processing":
      return <Tag variant={"solid"}>...</Tag>;
    case "saving":
      return (
        <Tag colorScheme={"blue"} variant="solid">
          <Spinner size={"sm"} />
        </Tag>
      );
    case "saved":
      return <Tag>{<CheckIcon />}</Tag>;
    case "error":
      return (
        <Tag colorScheme={"red"} variant="solid">
          Error
        </Tag>
      );
    default:
      throw new Error("Invalid state given: " + state);
  }
};

export interface Props {
  markdownText: string;
}

const NoteEditor = ({ markdownText }: Props): JSX.Element => {
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
    (state: EditorState) => {
      handleTextChange(state.doc.toString());
    },
    [handleTextChange]
  );

  const onSave = async (body: string) => {
    const { notesCollection, notesNotesList } = handelCrossEditing();
    if (body !== note?.body) {
      setSavingState("saving");
      const result = (await updateItem(
        "note",
        {
          noteLocation: {
            collectionId: notesCollection?.id || "",
            listId: notesNotesList?.id || "",
            noteId: note?.id || "",
          },
          noteInput: {
            body,
          },
        },
        updateNote
      )) as UseMutationState<UpdateNoteMutation, AnyVariables>;
      if (result?.data?.updateNote) {
        setSavingState("saved");
      } else {
        setSavingState("error");
      }
    }
  };

  useAutosave({ data: text, onSave });

  useEffect(() => {
    if (text !== note?.body) setSavingState("processing");
  }, [text, note?.body]);

  return (
    <Box>
      <SavingTag state={savingState} />
      <Editor markdownText={markdownText} handleChange={handleChange} />
    </Box>
  );
};

export default NoteEditor;
