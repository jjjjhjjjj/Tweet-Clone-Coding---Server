import { Server } from "socket.io";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*", //
      },
    });

    this.io.on("connection", (socket) => {
      console.log("User connect");
    });
  }
}

let socket;

export const initSocket = (server) => {
  if (!socket) {
    socket = new Socket(server);
  }
};

const getSocket = () => {
  if (!socket) {
    throw new Error("Init Socket...");
  }

  return socket.io;
};

export const emitSocket = (event, data) => {
  const io = getSocket();

  io.emit(event, data);
};
