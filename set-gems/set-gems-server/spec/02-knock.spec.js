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

describe("knock", () => {
  const roomName = "test";
  const members = [];

  afterEach(() => {
    serverSocket.leave(roomName);

    if (members.length) {
      members.forEach((socket) => socket.close());
    }
  });

  it("should set nickname when client emit knock", async () => {
    const nickname = "tester";
    let receivedNickname = "";

    const getResponse = new Promise((resolve) => {
      const done = function (nickname) {
        receivedNickname = nickname;
        resolve();
      };

      clientSocket.emit("knock", roomName, nickname, done);
    });

    await getResponse;

    expect(receivedNickname).toBe(nickname);
    expect(serverSocket.nickname).toBe(nickname);
    expect(serverSocket.isReady).toBe(false);
    expect(serverSocket.point).toBe(0);

    const room = serverSocket.rooms.has(roomName);

    expect(room).toBeTruthy();
  });

  it("should set random nickname when sent nickname is blank", async () => {
    const randomNickname = "anonymous0";
    let receivedNickname = "";

    const getResponse = new Promise((resolve) => {
      const done = function (nickname) {
        receivedNickname = nickname;
        resolve();
      };

      clientSocket.emit("knock", roomName, "", done);
    });

    await getResponse;

    expect(receivedNickname).toBe(randomNickname);
    expect(serverSocket.nickname).toBe(randomNickname);
    expect(serverSocket.isReady).toBe(false);
    expect(serverSocket.point).toBe(0);

    const room = serverSocket.rooms.has(roomName);

    expect(room).toBeTruthy();
  });

  it("should emit full_room when room has 4 members", async () => {
    let uncalledDone = jest.fn();

    const membersEnterRoom = new Promise((resolve) => {
      const done = function (nickname) {
        if (nickname === "anonymous3") {
          resolve();
        }
      };

      for (let i = 0; i < 4; i++) {
        const member = new Client(uri);
        member.emit("knock", roomName, "", done);
        members.push(member);
      }
    });

    await membersEnterRoom;

    const getFullRoom = new Promise((resolve) => {
      clientSocket.on("full_room", () => {
        resolve();
      });

      clientSocket.emit("knock", roomName, "", uncalledDone);
    });

    await getFullRoom;

    expect(uncalledDone).not.toHaveBeenCalled();
  });
});
