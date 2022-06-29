import configTransformations from "./configurations/transformations.json";
import configMessages from "./configurations/messages.json";

import { replaceMultiple } from "./utils";

export default class Message {
  private _reply: string = "";

  constructor(readonly _message: string = "") {
    if (!this.matchReply()) this.getAlternative();
  }

  get message() {
    return this._message;
  }

  get reply() {
    return this._reply;
  }

  private set reply(value) {
    this._reply = value;
  }

  private transform(): string {
    // Trim trailing whitespce
    // Remove digits - like 'hi1' remove 1 in this case and special characters
    // to lower case

    const text = this.message
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/[\d]/gi, "")
      .trim();

    // Transformation of specific letters by configurations
    return replaceMultiple(text, configTransformations);
  }

  matchReply() {
    const output = configMessages.match.find((value) =>
      value.input.includes(this.transform())
    )?.output;

    if (!output) return;

    this.reply = output[Math.floor(Math.random() * output.length)];

    return this.reply;
  }

  private getAlternative() {
    this.reply =
      configMessages.alternative[
        Math.floor(Math.random() * configMessages.alternative.length)
      ];
  }
}
