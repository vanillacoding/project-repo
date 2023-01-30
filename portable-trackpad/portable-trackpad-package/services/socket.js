const app = require("../app");
const robot = require("robotjs");
const os = require("os");
const open = require("open");

const myLocalIpAddress = os.networkInterfaces().en0[1].address;

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("verify-connectable", () =>
    socket.broadcast.emit("verify-connectable", myLocalIpAddress),
  );

  socket.on("user-send", async (data) => {
    switch (data[0]) {
      case "click":
        robot.mouseClick();

        break;
      case "rightClick":
        robot.mouseClick("right");

        break;
      case "move":
        if (data[1] < 30 && data[1] > -30 && data[2] < 30 && data[2] > -30) {
          const { x: xPosition, y: yPosition } = robot.getMousePos();

          robot.moveMouse(xPosition + data[1] * 2.5, yPosition + data[2] * 2.5);
        }

        break;
      case "scroll":
        if (data[2] < 120 && data[2] > -120) {
          robot.scrollMouse(0, data[2]);
        }

        break;
      case "volumeUp":
        robot.keyTap("audio_vol_up");

        break;
      case "volumeDown":
        robot.keyTap("audio_vol_down");

        break;
      case "mute":
        robot.keyTap("audio_mute");

        break;
      case "play":
        robot.keyTap("audio_play");

        break;
      case "pause":
        robot.keyTap("audio_pause");

        break;
      case "goForwardInTap":
        robot.keyTap("tab", "control");

        break;
      case "goBackInTap":
        robot.keyTap("tab", ["control", "shift"]);

        break;
      case "goForwardInBrowser":
        robot.keyTap("]", "command");

        break;
      case "goBackInBrowser":
        robot.keyTap("[", "command");

        break;
      case "dragDown":
        robot.mouseToggle("down");

        break;
      case "dragUp":
        robot.mouseToggle("up");

        break;
      case "openGestureDrawing":
        open("https://gesture-drawing.online/");

        break;
    }
  });

  socket.on("drawingGesture", (data) => {
    switch (data[0]) {
      case "triangle":
        app.io.emit("drawingGesture", "triangle");

        break;
      case "square":
        app.io.emit("drawingGesture", "square");

        break;
      case "circle":
        app.io.emit("drawingGesture", "circle");

        break;
      case "scaleUp":
        app.io.emit("drawingGesture", "scaleUp");

        break;
      case "scaleDown":
        app.io.emit("drawingGesture", "scaleDown");

        break;
    }
  });
});

module.exports = app.io;
