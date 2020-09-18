import { v4 as uuidv4 } from "uuid";

export const DRAG_STATE = {
  ERROR: -1,
  EMPTY: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export const FORM_STATE = {
  ERROR: -1,
  NORMAL: 0,
  WITH_FILE: 1,
  UPLOADING: 2,
  COMPELTE: 3,
};

export const hashString = (str) => {
  return uuidv4(str);
};
