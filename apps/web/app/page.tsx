"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    sendMessage(message.trim());
    setMessage("");
  };

  return (
    <div>
      <h1>All Message Will Appear Here</h1>
      <div>
        <div className={classes["chat-container"]}>
          <input
            type="text"
            className={classes["input"]}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message here"
            value={message}
          />
          <button onClick={handleSendMessage} className={classes["button"]}>
            Send
          </button>
        </div>
      </div>
      <div>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </div>
    </div>
  );
}
