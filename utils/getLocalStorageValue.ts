import { Collection, Note, NotesList } from "../generated/graphql";

export const getLocalStorageValue = (
  value: any
): Collection | NotesList | Note | null => {
  if (typeof value === "object") return value;
  else {
    if (value === "") return null;
    return JSON.parse(value);
  }
};
