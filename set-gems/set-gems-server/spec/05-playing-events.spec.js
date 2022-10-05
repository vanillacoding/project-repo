const { createServer } = require("http");
const createWsServer = require("../src/socket");
const Client = require("socket.io-client");

const roomName = "test";
let httpServer = null;
let uri = "";
let io = null;
let leaderServerSocket = null;
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

describe("start_select", () => {
  beforeEach(() => {
    leaderSocket.emit("start_select", roomName);
  });

  afterEach(() => {
    leaderSocket.emit("select_success", roomName, 0);
  });

  it("should emit new_selector with id", async () => {
    const receivedSelectorId = new Set();

    const emitterGetNewSelector = new Promise((resolve) => {
      leaderSocket.on("new_selector", (selectorId) => {
        receivedSelectorId.add(selectorId);
        resolve();
      });
    });

    const memberGetNewSelector = new Promise((resolve) => {
      leaderSocket.on("new_selector", (selectorId) => {
        receivedSelectorId.add(selectorId);
        resolve();
      });
    });

    await emitterGetNewSelector;
    await memberGetNewSelector;

    expect(leaderServerSocket.isSelector).toBe(true);
    expect(receivedSelectorId.size).toBe(1);
    expect(receivedSelectorId.has(leaderServerSocket.id)).toBe(true);
  });

  it("should emit countdown per second", async () => {
    let countdown = 0;
    let resolveFirstCountdown = null;
    const waitASecond = () => {
      return new Promise((resolve)  => setTimeout(() => resolve(), 1200));
    };

    leaderSocket.on("countdown", (selectTime) => {
      countdown = selectTime;
      resolveFirstCountdown();
    });

    const getFirstCountdown = new Promise((resolve) => {
      resolveFirstCountdown = resolve;
    });

    await getFirstCountdown;
    expect(countdown).toBe(5);

    await waitASecond();
    expect(countdown).toBe(4);

    await waitASecond();
    expect(countdown).toBe(3);

    await waitASecond();
    expect(countdown).toBe(2);

    await waitASecond();
    expect(countdown).toBe(1);

    await waitASecond();
    expect(countdown).toBe(0);
    expect(leaderServerSocket.isSelector).toBe(false);
  }, 10000);
});

describe("select_success", () => {
  beforeEach(async () => {
    const getStartSelect = new Promise((resolve) => {
      leaderSocket.on("new_selector", () => {
        resolve();
      });
    });

    leaderSocket.emit("start_select", roomName);
    await getStartSelect;
  });

  it("should emit select_success with point", async () => {
    const point = 3;
    let receivedPoint = 0;
    let receivedSelectorId = "";

    const getSelectSuccess = new Promise((resolve) => {
      leaderSocket.on("select_success", (point, selectorId) => {
        receivedPoint= point;
        receivedSelectorId = selectorId;
        resolve();
      });
    });

    expect(leaderServerSocket.isSelector).toBe(true);

    leaderSocket.emit("select_success", roomName, point);
    await getSelectSuccess;

    expect(receivedSelectorId).toBe(leaderServerSocket.id);
    expect(receivedPoint).toBe(point);

    expect(leaderServerSocket.point).toBe(point);
    expect(leaderServerSocket.isSelector).toBe(false);
  });
});

describe("set_cards", () => {
  it("should emit arguments to members", async () => {
    const openedCards = [{ card: 1 }, { card: 2 }];
    const remainingCards = [{ card: 3 }, { card: 4 }];
    let receivedOpenedCards = [];
    let receivedRemainingCards = [];

    const getSetCards = new Promise((resolve) => {
      memberSocket.on("set_cards", (openedCards, remainingCards) => {
        receivedOpenedCards = openedCards;
        receivedRemainingCards = remainingCards;
        resolve();
      });
    });

    leaderSocket.emit("set_cards", roomName, openedCards, remainingCards);

    await getSetCards;

    expect(receivedOpenedCards).toEqual(openedCards);
    expect(receivedRemainingCards).toEqual(remainingCards);
  });
});

describe("select_card", () => {
  it("should emit selected card's index", async () => {
    const selectedCardIndex = 5;
    let receivedCardIndex = 0;

    const getSelectCard = new Promise((resolve) => {
      memberSocket.on("select_card", (cardIndex) => {
        receivedCardIndex = cardIndex;
        resolve();
      });
    });

    leaderSocket.emit("select_card", roomName, selectedCardIndex);

    await getSelectCard;

    expect(receivedCardIndex).toBe(selectedCardIndex);
  });
});

describe("let_join", () => {
  let newPlayer = null;
  let newPlayerServerSocket = null;

  beforeEach(async () => {
    newPlayer = new Client(uri);

    io.on("connection", (socket) => {
      newPlayerServerSocket = socket;
    });

    const newPlayerConnected = new Promise((resolve) => {
      newPlayer.on("connect", resolve);
    });

    await newPlayerConnected;
  });

  afterEach(() => {
    newPlayer.close();
    newPlayerServerSocket = null;
  });

  it("should emit start and set_cards to new player", async () => {
    const memberGetSetCards = jest.fn();
    const openedCards = [{ card: 1 }, { card: 2 }];
    const remainingCards = [{ card: 3 }, { card: 4 }];
    let receivedOpenedCards = [];
    let receivedRemainingCards = [];

    const getStart = new Promise((resolve) => {
      newPlayer.on("start", () => {
        resolve();
      });
    });

    const getSetCards = new Promise((resolve) => {
      newPlayer.on("set_cards", (openedCards, remainingCards) => {
        receivedOpenedCards = openedCards;
        receivedRemainingCards = remainingCards;
        resolve();
      });
    });

    memberSocket.on("set_cards", () => {
      memberGetSetCards();
    });

    leaderSocket.emit("let_join", newPlayerServerSocket.id, openedCards, remainingCards);

    await getStart;
    await getSetCards;

    expect(receivedOpenedCards).toEqual(openedCards);
    expect(receivedRemainingCards).toEqual(remainingCards);
    expect(memberGetSetCards).not.toHaveBeenCalled();
  });
});
