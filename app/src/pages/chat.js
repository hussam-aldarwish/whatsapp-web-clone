import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import SocketIOClient from "socket.io-client";
import { v4 as uuid } from "uuid";

function Chat() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [chathistory, setChathistory] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  useEffect(() => {
    const socket = SocketIOClient.connect("http://localhost:3000", {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message) => {
      chathistory.push(message);
      setChathistory([...chathistory]);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    // build message obj
    const message = {
      user: user,
    };

    // dispatch message to other users
    const resp = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    // reset field if OK

    // focus after click
  };
  return (
    <>
      <h1>Chat</h1>
      <button onClick={sendMessage}>send</button>
      {chathistory.map((m) => (
        <h1 key={uuid()}>{m.user.username}</h1>
      ))}
    </>
  );
}
export default Chat;
