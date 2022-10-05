const { createServer } = require("http");
const createWsServer = require("../src/socket");
const Client = require("socket.io-client");

const roomName = "test";
let httpServer = null;
let uri = "";
let leaderServerSocket = null;
let memberServerSocket = null;
let leaderSocket = null;
let memberSocket = null;

beforeAll(async () => {
  const socketServerSet = new Promise((resolve) => {
    httpServer = createServer();
    io = createWsServer(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      uri = `http://localhost:${port}`;
      leaderSocket = new Client(uri);

      io.on("connection", (socket) => {
        if (!leaderServerSocket) {
          leaderServerSocket = socket;
        } else if (socket.id !== leaderServerSocket.id) {
          memberServerSocket = socket;
        }
      });

      leaderSocket.on("connect", resolve);
    });
  });

  await socketServerSet;

  const clientJoined = new Promise((resolve) => {
    leaderSocket.on("joined", () => {
      resolve();
    });

    const done = () => {
      leaderSocket.emit("join_room", roomName);
    };

    leaderSocket.emit("knock", roomName, "", done);
  });

  await clientJoined;

  const memberJoined = new Promise((resolve) => {
    memberSocket = new Client(uri);

    memberSocket.on("joined", () => {
      resolve();
    });

    const done = () => {
      memberSocket.emit("join_room", roomName);
    };

    memberSocket.emit("knock", roomName, "", done);
  });

  await memberJoined;
});

afterAll(() => {
  io.close();
  httpServer.close();
  leaderSocket.close();
  memberSocket.close();
});

describe("signal", () => {
  it("should send signal to player", async () => {
    const mockSignal = { isMock: true };
    let receivedData = null;

    const getSignal = new Promise((resolve) => {
      leaderSocket.on("signal", (data) => {
        receivedData = data;
        resolve();
      });
    });

    memberSocket.emit("signal", mockSignal, leaderSocket.id);

    await getSignal;

    expect(receivedData).toEqual({ isMock: true });
  });
});

describe("chat", () => {
  it("should send chat message to room", async () => {
    const message = "hi";
    let receivedMessage = "";

    const getChat = new Promise((resolve) => {
      memberSocket.on("chat", (message) => {
        receivedMessage = message;
        resolve();
      });
    });

    leaderSocket.emit("chat", roomName, message);

    await getChat;

    expect(receivedMessage).toBe(`${leaderServerSocket.nickname}: ${message}`);
  });
});

describe("ready", () => {
  it("should send member's isReady and isAllReady when member emit ready true", async () => {
    const receivedIsReady = new Set();
    const receivedPlayerId = new Set();
    let receivedIsAllReady = null;

    const leaderGetReady = new Promise((resolve) => {
      leaderSocket.on("ready", (isReady, playerId) => {
        receivedIsReady.add(isReady);
        receivedPlayerId.add(playerId);
        resolve();
      });
    });

    const memberGetReady = new Promise((resolve) => {
      memberSocket.on("ready", (isReady, playerId) => {
        receivedIsReady.add(isReady);
        receivedPlayerId.add(playerId);
        resolve();
      });
    });

    const leaderGetAllReady = new Promise((resolve) => {
      leaderSocket.on("all_ready", (isAllReady) => {
        receivedIsAllReady = isAllReady;
        resolve();
      });
    });

    memberSocket.emit("ready", true, roomName);

    await Promise.all([leaderGetReady, memberGetReady, leaderGetAllReady]);

    expect(receivedIsReady.size).toBe(1);
    expect(receivedPlayerId.size).toBe(1);
    expect(receivedIsReady.has(true)).toBe(true);
    expect(receivedPlayerId.has(memberServerSocket.id)).toBe(true);
    expect(receivedIsAllReady).toBe(true);
  });

  it("should send member's isReady and isAllReady when member emit ready false", async () => {
    const receivedIsReady = new Set();
    const receivedPlayerId = new Set();
    let receivedIsAllReady = null;

    const leaderGetReady = new Promise((resolve) => {
      leaderSocket.on("ready", (isReady, playerId) => {
        receivedIsReady.add(isReady);
        receivedPlayerId.add(playerId);
        resolve();
      });
    });

    const memberGetReady = new Promise((resolve) => {
      memberSocket.on("ready", (isReady, playerId) => {
        receivedIsReady.add(isReady);
        receivedPlayerId.add(playerId);
        resolve();
      });
    });

    const leaderGetAllReady = new Promise((resolve) => {
      leaderSocket.on("all_ready", (isAllReady) => {
        receivedIsAllReady = isAllReady;
        resolve();
      });
    });

    memberSocket.emit("ready", false, roomName);

    await Promise.all([leaderGetReady, memberGetReady, leaderGetAllReady]);

    expect(receivedIsReady.size).toBe(1);
    expect(receivedPlayerId.size).toBe(1);
    expect(receivedIsReady.has(false)).toBe(true);
    expect(receivedPlayerId.has(memberServerSocket.id)).toBe(true);
    expect(receivedIsAllReady).toBe(false);
  });
});

describe("start", () => {
  it("should send start to all room members", async () => {
    const leaderGetStart = new Promise((resolve) => {
      leaderSocket.on("start", () => {
        resolve();
      });
    });

    const memberGetStart = new Promise((resolve) => {
      memberSocket.on("start", () => {
        resolve();
      });
    });

    leaderSocket.emit("start", roomName);

    await Promise.all([leaderGetStart, memberGetStart]);
  });
});
