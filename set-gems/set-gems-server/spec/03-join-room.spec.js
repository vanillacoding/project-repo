const { createServer } = require("http");
const createWsServer = require("../src/socket");
const Client = require("socket.io-client");

let httpServer = null;
let uri = "";
let serverSocket = null;
let clientSocket = null;

beforeAll((done) => {
  httpServer = createServer();
  io = createWsServer(httpServer);
  httpServer.listen(() => {
    const port = httpServer.address().port;
    uri = `http://localhost:${port}`;
    clientSocket = new Client(uri);

    io.on("connection", (socket) => {
      serverSocket = socket;
    });

    clientSocket.on("connect", done);
  });
});

afterAll(() => {
  io.close();
  httpServer.close();
  clientSocket.close();
});

describe("join_room", () => {
  const roomName = "test";
  let memberSocket = null;

  afterEach(() => {
    serverSocket.leave(roomName);

    if (memberSocket) {
      memberSocket.close();
    }
  });

  it("should set leader when use joined empty room", async () => {
    let receivedRoomMembers = null;

    const getJoined = new Promise((resolve) => {
      clientSocket.on("joined", (roomMembers) => {
        receivedRoomMembers = roomMembers;
        resolve();
      });

      clientSocket.emit("join_room", roomName);
    });

    await getJoined;

    expect(receivedRoomMembers.length).toBe(0);
    expect(serverSocket.isLeader).toBe(true);
  });

  it("should emit new_player with playerInfo", async () => {
    const nickname = "tester";
    let receivedRoomMembers = null;
    let newPlayer = null;

    const memberJoined = new Promise((resolve) => {
      const done = () => resolve();

      memberSocket = new Client(uri);
      memberSocket.emit("knock", roomName, "", done);
    });

    await memberJoined;

    const getResponse = new Promise((resolve) => {
      const done = () => resolve();
      clientSocket.emit("knock", roomName, nickname, done);
    });

    await getResponse;

    const getJoined = new Promise((resolve) => {
      clientSocket.on("joined", (roomMembers) => {
        receivedRoomMembers = roomMembers;
        resolve();
      });
    });

    const getNewPlayer = new Promise((resolve) => {
      memberSocket.on("new_player", (player) => {
        newPlayer = player;
        resolve();
      });
    });

    clientSocket.emit("join_room", roomName);

    await getNewPlayer;
    await getJoined;

    expect(receivedRoomMembers.length).toBe(1);
    expect(newPlayer).toBeTruthy();
    expect(newPlayer.nickname).toBe(nickname);
    expect(newPlayer.id).toBe(clientSocket.id);
    expect(newPlayer.isReady).toBe(false);
  });
});
