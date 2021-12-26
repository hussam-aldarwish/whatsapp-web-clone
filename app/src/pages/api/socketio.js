import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handle(req, res) {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer = res.socket.server;
    console.log(
      "🚀 ~ file: socketio.js ~ line 14 ~ handle ~ httpServer",
      httpServer.connection
    );
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
      port: 443,
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
}
export default handle;
