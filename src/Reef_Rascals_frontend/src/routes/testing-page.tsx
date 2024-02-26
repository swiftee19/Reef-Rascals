import React, { useEffect, useState } from "react";
import { ws } from "../websocket_frontend/helper";

type AppMessage = {
  message: string;
  opponent?: string;
};

type uiMessage = {
  from: string;
  message: AppMessage;
};

export default function TestingPage() {
  const [messages, setMessages] = useState<uiMessage[]>([]);
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [opponent, setOpponent] = useState<string | null>(null);

  const [connecting, setConnecting] = useState<boolean>(true);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  ws.onopen = () => {
    console.log("Connected to the canister");
    setIsConnected(true);
    setIsClosed(false);
    setConnecting(false);
  };

  ws.onclose = () => {
    console.log("Disconnected from the canister");
    setIsClosed(true);
    setIsConnected(false);
    setConnecting(false);
  };

  ws.onerror = (error) => {
    console.log("Error:", error);
  };

  useEffect(() => {
    ws.onmessage = async (event) => {
      try {
        setIsActive(true);
        const recievedMessage: AppMessage = event.data;

        if (recievedMessage.opponent) {
          setOpponent(recievedMessage.opponent);
        }

        const fromBackendMessage: uiMessage = {
          from: "backend",
          message: recievedMessage,
        };
        setMessages((prev) => [...prev, fromBackendMessage]);

        setMessagesCount((prev) => prev + 1);

        setTimeout(async () => {
          sendMessage();
        }, 1000);
      } catch (error) {
        console.log("Error recievinf message", error);
      }
    };
  }, []);

  const sendMessage = async () => {
    try {
      const sentMessage: AppMessage = {
        message: "pong",
      };

      ws.send(sentMessage);
      const fromFrontendMessage: uiMessage = {
        from: "frontend",
        message: sentMessage,
      };
      setMessages((prev) => [...prev, fromFrontendMessage]);
    } catch (error) {
      console.log("Error on sending message", error);
    }
  };

  const handleClose = () => {
    ws.close();
  };

  const handleReconnect = () => {
    window.location.reload();
  };

  const searchOpponent = async () => {
    try {
      const searchMessage: AppMessage = {
        message: "searchOpponent",
      };

      ws.send(searchMessage);
    } catch (error) {
      console.log("Error on searching for opponent", error);
    }
  };

  useEffect(() => {
    if (messagesCount === 25) {
      ws.close();
    }
  }, [messagesCount]);

  console.log(messages);

  return (
    <div>
      {/* Render the opponent information */}
      {opponent && <p>Opponent: {opponent}</p>}

      {/* Render the search button */}
      <button onClick={searchOpponent}>Search Opponent</button>
    </div>
  );
}