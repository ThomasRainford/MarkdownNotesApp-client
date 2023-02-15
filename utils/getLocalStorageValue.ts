import { Collection, Note, NotesList } from "../generated/graphql";

export const getLocalStorageValue = (
  value: any
): Collection | NotesList | Note => {
  if (typeof value === "object") return value;
  else {
    if (value === "") return value;
    return JSON.parse(value);
  }
};
