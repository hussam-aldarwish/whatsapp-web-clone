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
    messageReceived: (state, { payload: { id, text, room, user } }) => {
      if (!state.rooms.some((r) => r.id === room.id)) state.rooms.push(room);
      state.messages.push({ id: id, text: text, room: room, user: user });
    },
    selectRoom: (state, { id }) => {
      state.selectedRoomId = id;
    },
    setConnected: (state, { payload }) => {
      state.connected = payload;
    },
  },
});

export const { messageReceived, selectRoom, setConnected } = chatSlice.actions;
export default chatSlice;

export const getConnected = (state) => state?.[sliceName]?.connected;

export const getSelectedRoom = (state) =>
  state?.[sliceName]?.rooms.find(
    (r) => r.id === state?.[sliceName]?.selectedRoomId
  );

export const getMessages = (state) =>
  state?.[sliceName]?.messages.filter(
    (m) => m.room.id === state?.[sliceName]?.selectedRoomId
  );
