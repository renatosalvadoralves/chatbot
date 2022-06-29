import { TConfig } from "../types/server.types";

export const replaceMultiple = (text: string, characters: TConfig) => {
  for (const each of characters) {
    text = text.replace(new RegExp(each.input, "g"), each.output);
  }
  return text;
};
