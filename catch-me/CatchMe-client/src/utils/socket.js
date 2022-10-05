import { io } from "socket.io-client";

export const socket = io.connect(process.env.SERVER_PORT, { transports: ["websocket"] });
