import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { v4 as uuid } from "uuid";
import {
  getMessages,
  getSelectedRoom,
  messageReceived,
  setConnected,
} from "../features/chatSlice";
import Pusher from "pusher-js";

function Chat() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentRoom = useSelector(getSelectedRoom);

  const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
    cluster: "eu",
  });

  useEffect(() => {
    if (!user) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    var channel = pusher.subscribe("my-channel");
    if (channel) dispatch(setConnected(true));

    channel.bind("chat-update", function (message) {
      const { id, text, room, user } = message;
      dispatch(messageReceived({ id: id, text: text, room: room, user: user }));
    });

    return () => {
      if (channel) {
        pusher.unsubscribe("my-channel");
        dispatch(setConnected(false));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async (text) => {
    // build message obj
    const message = {
      user: user,
      room: currentRoom,
      text: text,
      id: uuid(),
    };

    await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const chathistory = useSelector(getMessages);
  return (
    <>
      <h1>Chat</h1>
      <button onClick={() => sendMessage("test message")}>send</button>
      {chathistory.map((m) => (
        <h1 key={uuid()}>{m.text}</h1>
      ))}
    </>
  );
}
export default Chat;
