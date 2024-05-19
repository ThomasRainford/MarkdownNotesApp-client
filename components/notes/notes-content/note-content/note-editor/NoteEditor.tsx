import { CheckIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Spinner, Tag } from "@chakra-ui/react";
import { EditorState } from "@codemirror/state";
import { useCallback, useEffect, useState } from "react";
import { useAutosave } from "react-autosave";
import { AnyVariables, UseMutationState } from "urql";
import {
  Note,
  UpdateNoteMutation,
  useUpdateNoteMutation,
} from "../../../../../generated/graphql";
import { useAllLocalStorageValues } from "../../../../../utils/hooks/useAllLocalStorageValues";
import useCodeMirror from "../../../../../utils/hooks/useCodeMirror";
import { useUpdateItem } from "../../../../../utils/hooks/useUpdateItem";

const Editor = ({
  markdownText,
  handleChange,
  readOnly,
}: {
  markdownText: string;
  handleChange: ((_: EditorState) => void) | undefined;
  readOnly: boolean;
}): JSX.Element => {
  const [refContainer] = useCodeMirror<HTMLDivElement>({
    initialDoc: markdownText,
    onChange: handleChange,
    readOnly,
  });

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
  note: Note;
  readOnly: boolean;
}

const NoteEditor = ({ note, readOnly }: Props): JSX.Element => {
  const [, updateNote] = useUpdateNoteMutation();
  const [updateItem] = useUpdateItem();
  const [savingState, setSavingState] = useState<
    "processing" | "saving" | "saved" | "error"
  >("saved");
  const [text, setText] = useState(note.body);
  const {
    selectedNote: { selectedNote },
  } = useAllLocalStorageValues();

  const handleTextChange = useCallback(
    (newText: string) => {
      if (!readOnly) {
        setText(newText);
      }
    },
    [readOnly]
  );

  const handleChange = useCallback(
    (state: EditorState) => {
      handleTextChange(state.doc.toString());
    },
    [handleTextChange]
  );

  const onSave = async (body: string) => {
    if (body !== note?.body) {
      setSavingState("saving");
      const result = (await updateItem(
        "note",
        {
          noteLocation: {
            collectionId: selectedNote?.collectionId || "",
            listId: selectedNote?.notesListId || "",
            noteId: selectedNote?.id || "",
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
    if (text !== note?.body) {
      setSavingState("processing");
    } else {
      setSavingState("saved");
    }
  }, [text, note?.body]);

  return (
    <Box>
      {readOnly && (
        <Alert status="info">
          <AlertIcon />
          This note is read-only.
        </Alert>
      )}
      {!readOnly && <SavingTag state={savingState} />}
      <Editor
        markdownText={note.body}
        handleChange={handleChange}
        readOnly={readOnly}
      />
    </Box>
  );
};

export default NoteEditor;
