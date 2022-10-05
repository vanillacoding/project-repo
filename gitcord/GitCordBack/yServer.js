const ws = require("ws");
const http = require("http");
const map = require("lib0/dist/map.cjs");

const wsReadyStateConnecting = 0;
const wsReadyStateOpen = 1;
const wsReadyStateClosing = 2;
const wsReadyStateClosed = 3;

const pingTimeout = 30000;

const port = process.env.Y_SERVER_PORT || 4444;

const wss = new ws.Server({ noServer: true });

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

const topics = new Map();

const send = (conn, message) => {
  if (conn.readyState !== wsReadyStateConnecting && conn.readyState !== wsReadyStateOpen) {
    conn.close();
  }

  try {
    conn.send(JSON.stringify(message));
  } catch (err) {
    conn.close();
  }
};

const onconnection = (conn) => {
  const subscribedTopics = new Set();
  let closed = false;
  let pongReceived = true;

  const pingInterval = setInterval(() => {
    if (!pongReceived) {
      conn.close();
      clearInterval(pingInterval);
    } else {
      pongReceived = false;

      try {
        conn.ping();
      } catch (err) {
        conn.close();
      }
    }
  }, pingTimeout);

  conn.on("pong", () => {
    pongReceived = true;
  });

  conn.on("close", () => {
    subscribedTopics.forEach((topicName) => {
      const subs = topics.get(topicName) || new Set();

      subs.delete(conn);

      if (subs.size === 0) {
        topics.delete(topicName);
      }
    });

    subscribedTopics.clear();
    closed = true;
  });

  conn.on("message", (message) => {
    if (typeof message === "string") {
      message = JSON.parse(message);
    }

    if (message && message.type && !closed) {
      switch (message.type) {
        case "subscribe":
          (message.topics || []).forEach((topicName) => {
            if (typeof topicName === "string") {
              const topic = map.setIfUndefined(topics, topicName, () => new Set());

              topic.add(conn);
              subscribedTopics.add(topicName);
            }
          });
          break;

        case "unsubscribe":
          (message.topics || []).forEach((topicName) => {
            const subs = topics.get(topicName);

            if (subs) {
              subs.delete(conn);
            }
          });
          break;

        case "publish":
          if (message.topic) {
            const receivers = topics.get(message.topic);

            if (receivers) {
              receivers.forEach((receiver) =>
                send(receiver, message)
              );
            }
          }
          break;

        case "ping":
          send(conn, { type: "pong" });
      }
    }
  });
};

wss.on("connection", onconnection);

server.on("upgrade", (request, socket, head) => {
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };

  wss.handleUpgrade(request, socket, head, handleAuth);
})

server.listen(port);

console.log("Signaling server running on localhost:", port);
