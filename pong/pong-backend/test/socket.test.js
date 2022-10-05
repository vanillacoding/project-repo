const { expect } = require("chai");
const io = require("socket.io-client");
require("../bin/www");

const SERVER_URL = "http://localhost:8000";
const OPTIONS = {
  "transports": ["websocket"],
  "force new connection": true
};

let client;
let client2;

describe("Websocket server test", () => {
  describe("initialConnection", () => {
    beforeEach((done) => {
      client = io.connect(SERVER_URL, OPTIONS);
      client2 = io.connect(SERVER_URL, OPTIONS);

      client.on("connect", () => {
        setTimeout(done, 100);
      });
    });

    after((done) => {
      client.disconnect();
      client2.disconnect();
      done();
    });

    it("emit initialConnection with socketId", (done) => {
      client.on("connectSuccess", (socketId) => {
        expect(typeof socketId).to.equal("string");
      });

      client.emit("initialConnection", "mockUserName");
      done();
    });

    it("should match if there is people in watingQue", (done) => {
      client2.on("completeMatch", (data) => {
        expect(data.isMatched).to.eql(true);
        expect(data.partner.name).to.eql("mockUserName");
        expect(data.gameBoard.isModerator).to.eql(true);
        done();
      });

      client2.emit("initialConnection", "mockUserName2");
    });
  });
});
