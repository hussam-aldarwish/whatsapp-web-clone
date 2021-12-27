import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { useRouter } from "next/router";
import { addRoom, getrooms } from "../features/chatSlice";
import { v4 as uuid } from "uuid";

function Sidebar() {
  const user = useSelector(selectUser);
  const router = useRouter();
  const rooms = useSelector(getrooms);
  const dispatch = useDispatch();
  const createRoom = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      const id = uuid();
      const encodedRoomName = encodeURI(roomName);
      const imageUrl = `https://avatars.dicebear.com/api/jdenticon/${encodedRoomName}.svg`;
      dispatch(addRoom({ id: id, name: roomName, imageUrl }));
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.imageUrl} />
        <div>
          <h4>{user.username}</h4>
          <small>Online</small>
        </div>
        <div className="sidebar_headerRight">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={() => router.push("/logout")}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>

      {/* <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div> */}

      <div className="sidebar_chats">
        <div onClick={createRoom} className="sidebarChat">
          <h2>Add new room</h2>
        </div>
        {rooms?.map((r) => (
          <SidebarChat room={r} key={r.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
