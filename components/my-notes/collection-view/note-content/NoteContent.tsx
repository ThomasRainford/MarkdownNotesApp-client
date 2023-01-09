import { SelectedNoteContext } from "../../../../contexts/SelectedNoteContext";
import { getLocalStorageValue } from "../../../../utils/getLocalStorageValue";
import { useLocalStorageValue } from "../../../../utils/hooks/useLocalStorageValue";
import {
  LocalStorageContextType,
  LocalStorageKeys,
} from "../../../../utils/types/types";

const NoteContent = (): JSX.Element => {
  const [selecteNote] = useLocalStorageValue(
    SelectedNoteContext,
    LocalStorageKeys.SELECTED_NOTE
  ) as LocalStorageContextType;
  const _selectedNote = getLocalStorageValue(selecteNote);
  const note = _selectedNote.note;
  const list = _selectedNote.list;
  const collection = _selectedNote.collection;

  return (
    <div>
      {_selectedNote && (
        <div>
          <div>
            <span>{collection.title}</span>
            <span>/</span>
            <span> {list.title}</span>
          </div>
          <div>
            <h1>{note.title}</h1>
            <p>{note.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteContent;
