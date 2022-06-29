import React, {
  KeyboardEvent,
  ChangeEvent,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import { OWNER, TMessage, TResponseAPI } from "../types/client.types";

const Home: NextPage = () => {
  const [inputTxt, setInputTxt] = useState<string>("");
  const [messages, setMessages] = useState<TMessage[]>([]);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputTxt(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setMessages((prev) => [
          ...prev,
          {
            text: inputTxt,
            owner: OWNER.ME,
          },
        ]);
        setInputTxt("");

        const { data } = await axios.post<TResponseAPI>("/api/message", {
          message: inputTxt,
        });

        setMessages((prev) => [
          ...prev,
          {
            text: data.message,
            owner: OWNER.BOT,
          },
        ]);
      }
    },
    [inputTxt]
  );

  const renderMessages = useMemo(
    () =>
      messages.map((value, i) =>
        value.owner === OWNER.ME ? (
          <div key={`message-me${i}`} className="user response">
            <Image src={"/user.png"} alt="User" width={25} height={25} />
            <span className="message-txt">{value.text}</span>
          </div>
        ) : (
          <div key={`message-bot${i}`} className="bot response">
            <span className="message-txt">{value.text}</span>
            <Image
              src={"/bot-mini.png"}
              alt="Bot-Mini"
              width={25}
              height={25}
            />
          </div>
        )
      ),
    [messages]
  );

  return (
    <main className="main flex-center">
      <div className="chat flex-center">
        <div className="messages">{renderMessages}</div>
        <input
          className="input"
          type="text"
          placeholder="Say something..."
          autoComplete="off"
          autoFocus
          value={inputTxt}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
      </div>
      <Image src="/bot.png" alt="Robot Cartoon" width={420} height={500} />
    </main>
  );
};

export default Home;
