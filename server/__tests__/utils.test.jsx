import { replaceMultiple } from "../utils";

describe("Utils", () => {
  it("replaceMultiple Fn", () => {
    const arrange = {
      text: "i feel nice",
      configurations: [
        {
          input: " a ",
          output: " ",
        },
        {
          input: "i feel ",
          output: "",
        },
        {
          input: "whats",
          output: "what is",
        },
        {
          input: "please ",
          output: "",
        },
        {
          input: " please",
          output: "",
        },
        {
          input: "r u",
          output: "are you",
        },
      ],
    };

    const result = replaceMultiple(arrange.text, arrange.configurations);
    expect(result).toBe("nice");
  });
});
