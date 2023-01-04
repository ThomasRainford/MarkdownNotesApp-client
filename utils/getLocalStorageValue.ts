export const getLocalStorageValue = (value: any) => {
  if (typeof value === "object") return value;
  else {
    if (value === "") return value;
    return JSON.parse(value);
  }
};
