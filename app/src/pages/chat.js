import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { messageReceived, setConnected } from "../features/chatSlice";
import Pusher from "pusher-js";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function ChatPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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

    channel.bind("chat-update", (message) => {
      dispatch(messageReceived({ ...message }));
    });

    return () => {
      if (channel) {
        pusher.unsubscribe("my-channel");
        dispatch(setConnected(false));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
export default ChatPage;
