// Contains small utility functions.

import { ChatPrivate, ChatRoom } from "../generated/graphql";

/**
 * Returns whether arr1 contains an element in arr2.
 *
 * @param arr1
 * @param arr2
 * @returns
 */
export const includesAny = <T>(arr1: T[], arr2: T[]) => {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      return true;
    }
  }
  return false;
};

export const chatName = (chat: ChatPrivate | ChatRoom, meId: string) => {
  const name =
    chat.__typename === "ChatPrivate"
      ? chat.participants[0].id === meId
        ? chat.participants[1].username
        : chat.participants[0].username
      : chat.__typename === "ChatRoom"
      ? chat.name
      : "";
  return name;
};
