import Message from "../message.entity";
import configMessages from "../configurations/messages.json";

describe("Message", () => {
  test("getter and setter of reply prop", () => {
    const entity = new Message("why");

    entity["reply"] = "some Reply Updated";
    expect(entity.reply).toBe("some Reply Updated");
  });

  test("getter message prop", () => {
    const entity = new Message("why");

    expect(entity.message).toBe("why");
  });

  test("transform fn", () => {
    const arrange = [
      {
        input: "TEST",
        output: "test",
      },
      {
        input: "TEST1",
        output: "test",
      },
      {
        input: "TEST!",
        output: "test",
      },
      {
        input: "     TEST     ",
        output: "test",
      },
      {
        input: "i feel nice",
        output: "nice",
      },
      {
        input: "whats nice",
        output: "what is nice",
      },
      {
        input: "please do me a favor",
        output: "do me favor",
      },
      {
        input: "r u doing",
        output: "are you doing",
      },
      {
        input: "take some time",
        output: "take time",
      },
    ];

    for (const i of arrange) {
      const message = new Message(i.input);
      expect(message["transform"]()).toBe(i.output);
    }
  });

  test("match reply fn", () => {
    const arrange = [
      {
        input: "what",
        output: "Great question",
      },
      {
        input: "",
        output: "Please say something :(",
      },
      {
        input: "whats moneyhub",
        output: "Help to manage your finances",
      },
    ];

    for (const i of arrange) {
      const message = new Message(i.input);
      expect(message.reply).toBe(i.output);
    }
  });

  test("get alternative fn", () => {
    const message = new Message("asdfnkfgjsdngjfndhkfghgfhf");

    expect(configMessages.alternative.includes(message.reply)).toBeTruthy();
  });

  it("should get alternative in contructor", () => {
    const spyAlternative = jest.spyOn(Message.prototype, "getAlternative");
    const spyMatchReply = jest
      .spyOn(Message.prototype, "matchReply")
      .mockImplementation(() => "");

    new Message("hello");
    expect(spyMatchReply).toHaveBeenCalledTimes(1);
    expect(spyAlternative).toHaveBeenCalledTimes(1);
    spyAlternative.mockClear();
    spyMatchReply.mockClear();
  });

  it("should not get alternative in contructor", () => {
    const spyAlternative = jest.spyOn(Message.prototype, "getAlternative");
    const spyMatchReply = jest
      .spyOn(Message.prototype, "matchReply")
      .mockImplementation(() => "have matched result");

    new Message("hello");
    expect(spyMatchReply).toHaveBeenCalledTimes(1);
    expect(spyAlternative).toHaveBeenCalledTimes(0);
    spyAlternative.mockClear();
    spyMatchReply.mockClear();
  });
});
