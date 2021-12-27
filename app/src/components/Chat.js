import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { getMessages, getSelectedRoom } from "../features/chatSlice";
import { selectUser } from "../features/authSlice";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

function Chat() {
  const room = useSelector(getSelectedRoom);
  const chatHistory = useSelector(getMessages);
  const user = useSelector(selectUser);

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = handleSubmit(async ({ text }) => {
    const message = {
      id: uuid(),
      user: user,
      room: room,
      text: text,
      timestap: new Date(),
    };
    await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    reset();
  });

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={room?.imageUrl} />
        <div className="chat_headerInfo">
          <h3>{room.name}</h3>
          <p>Online</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {chatHistory?.map((m) => (
          <p
            key={m.id}
            className={`${
              m.user.id === user.id
                ? "chat_message"
                : "chat_message chat_reciever"
            }`}
          >
            <span className="chat_name">
              {m.user.id === user.id ? "Me" : m.user.username}{" "}
              {m.user.gender === "male" ? "♂" : "♀"}
            </span>
            {m.text}
            <span className="chat_timestap">
              {new Date(m.timestap).toLocaleString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <form onSubmit={onSubmit}>
          <input
            autoFocus
            placeholder="Type a message"
            type="text"
            {...register("text", { required: true })}
          />
          <button type="submit" disabled={!isValid}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
