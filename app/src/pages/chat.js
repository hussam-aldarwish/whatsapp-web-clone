import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import SocketIOClient from "socket.io-client";
import { v4 as uuid } from "uuid";
import {
  getMessages,
  messageReceived,
  setConnected,
} from "../features/chatSlice";

function Chat() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    const socket = SocketIOClient.connect(process.env.NEXT_PUBLIC_BASE_URL, {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      dispatch(setConnected(true));
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("message", (message) => {
      const { id, text, room, user } = message;
      dispatch(messageReceived({ id: id, text: text, room: room, user: user }));
    });

    if (socket) {
      return () => {
        socket.disconnect();
        dispatch(setConnected(false));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    // build message obj
    const message = {
      user: user,
      room: {
        id: "7dc6d19b-8bd3-4186-9deb-b850dcbbc2e6",
        name: "Default Room",
        imageUrl:
          "https://avatars.dicebear.com/api/jdenticon/Default%20Room.svg",
      },
      text: "fdsgbdf",
      id: uuid(),
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

  const chathistory = useSelector(getMessages);
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
