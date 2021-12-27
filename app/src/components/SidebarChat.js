import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLastMessage, selectRoom } from "../features/chatSlice";

function SidebarChat({ room }) {
  const { id, name, imageUrl } = room;
  const lastMessage = useSelector((state) => getLastMessage(state, id));
  const dispatch = useDispatch();
  return (
    <div className="sidebarChat" onClick={() => dispatch(selectRoom(id))}>
      <Avatar src={imageUrl} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p>{lastMessage?.text}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
