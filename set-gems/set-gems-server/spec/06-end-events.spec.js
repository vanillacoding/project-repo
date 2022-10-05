const { createServer } = require("http");
const createWsServer = require("../src/socket");
const Client = require("socket.io-client");

const roomName = "test";
let httpServer = null;
let uri = "";
let io = null;
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
        } else {
          memberServerSocket = socket;
        }
      });

      leaderSocket.on("connect", resolve);
    });
  });

  await socketServerSet;

  const leaderJoined = new Promise((resolve) => {
    leaderSocket.on("joined", () => {
      resolve();
    });

    const done = () => {
      leaderSocket.emit("join_room", roomName);
    };

    leaderSocket.emit("knock", roomName, "", done);
  });

  await leaderJoined;

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

describe("game_over", () => {
  const leaderPoint = 10;
  const memberPoint = 20;

  beforeEach(() => {
    leaderServerSocket.point = leaderPoint;
    memberServerSocket.point = memberPoint;
  });

  it("should emit game_over with result", async () => {
    let receivedResult = [];

    const getGameOver = new Promise((resolve) => {
      leaderSocket.on("game_over", (result) => {
        receivedResult = result;
        resolve();
      });
    });

    leaderSocket.emit("game_over", roomName);
    await getGameOver;

    expect(receivedResult).toEqual([
      {
        nickname: leaderServerSocket.nickname,
        point: leaderPoint,
      },
      {
        nickname: memberServerSocket.nickname,
        point: memberPoint,
      },
    ]);
  });
});

describe("exit_room", () => {
  afterEach(async () => {
    const leaderJoined = new Promise((resolve) => {
      leaderSocket.on("joined", () => {
        resolve();
      });

      const done = () => {
        leaderSocket.emit("join_room", roomName);
      };

      leaderSocket.emit("knock", roomName, "", done);
    });

    await leaderJoined;

    leaderServerSocket.isLeader = true;
    memberServerSocket.isLeader = false;
  });

  it("should emit player_left and new_leader", async () => {
    let leavingPlayerId = "";
    let receivedNewLeaderId = "";

    const getPlayerLeft = new Promise((resolve) => {
      memberSocket.on("player_left", (playerId) => {
        leavingPlayerId = playerId;
        resolve();
      });
    });

    const getNewLeader = new Promise((resolve) => {
      memberSocket.on("new_leader", (newLeaderId) => {
        receivedNewLeaderId = newLeaderId;
        resolve();
      });
    });

    leaderSocket.emit("exit_room", roomName);

    await getPlayerLeft;
    await getNewLeader;

    expect(leavingPlayerId).toBe(leaderServerSocket.id);
    expect(receivedNewLeaderId).toBe(memberServerSocket.id);
    expect(leaderServerSocket.isLeader).toBe(false);
    expect(memberServerSocket.isLeader).toBe(true);
  });
});
