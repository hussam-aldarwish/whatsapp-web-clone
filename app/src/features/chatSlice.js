import { createSlice } from "@reduxjs/toolkit";

const sliceName = "chat";
const initialState = {
  connected: false,
  rooms: [
    {
      id: "7dc6d19b-8bd3-4186-9deb-b850dcbbc2e6",
      name: "Default Room",
      imageUrl: "https://avatars.dicebear.com/api/jdenticon/Default%20Room.svg",
    },
  ],
  selectedRoomId: "7dc6d19b-8bd3-4186-9deb-b850dcbbc2e6",
  messages: [],
};

const chatSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    messageReceived: (
      state,
      { payload: { id, text, room, user, timestap } }
    ) => {
      if (!state.rooms?.some((r) => r.id === room.id)) state.rooms.push(room);
      state.messages.push({ id, text, room, user, timestap });
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    selectRoom: (state, { payload }) => {
      state.selectedRoomId = payload;
    },
    clearRooms: (state) => {
      state.rooms = [
        {
          id: "7dc6d19b-8bd3-4186-9deb-b850dcbbc2e6",
          name: "Default Room",
          imageUrl:
            "https://avatars.dicebear.com/api/jdenticon/Default%20Room.svg",
        },
      ];
    },
    setConnected: (state, { payload }) => {
      state.connected = payload;
    },
    addRoom: (state, { payload: { id, name, imageUrl } }) => {
      const room = state.rooms?.find((r) => r.name === name);
      if (room) {
        state.selectedRoomId = room.id;
      } else {
        state.rooms.push({ id, name, imageUrl });
        state.selectedRoomId = id;
      }
    },
  },
});

export const {
  messageReceived,
  selectRoom,
  setConnected,
  addRoom,
  clearMessages,
  clearRooms,
} = chatSlice.actions;
export default chatSlice;

export const getConnected = (state) => state?.[sliceName]?.connected;
export const getrooms = (state) => state?.[sliceName]?.rooms;
export const getSelectedRoom = (state) =>
  state?.[sliceName]?.rooms?.find(
    (r) => r.id === state?.[sliceName]?.selectedRoomId
  );
export const getMessages = (state) =>
  state?.[sliceName]?.messages?.filter(
    (m) => m.room.id === state?.[sliceName]?.selectedRoomId
  );
export const getLastMessage = (state, roomId) =>
  state?.[sliceName]?.messages
    ?.filter((m) => m.room.id === roomId)
    .slice(-1)[0];
