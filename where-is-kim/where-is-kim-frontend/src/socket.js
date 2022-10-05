import io from "socket.io-client";

export const socket = io.connect("https://api.where-is-kim.site:3030");

export function emitJoinTeam(username, teamName) {
  socket.emit("join team", username, teamName);
}

export function emitLeaveTeam() {
  socket.emit("leave team");
}

export function emitAddThread() {
  socket.emit("add thread");
}
