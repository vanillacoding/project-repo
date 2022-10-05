const request = require("supertest");

const { dbConnect, dbDisconnect } = require("./db");
const app = require("../src/express/app");
const Ranking = require("../src/express/models/Ranking");
const { OK } = require("../src/constants/statusCodes");

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("POST /ranking", () => {
  afterEach(async () => {
    try {
      await Ranking.deleteMany();
    } catch(err) {
      console.log(`error: ${err} cannot delete mock data`);
    }
  });

  it("should create new ranking data", async () => {
    const spyCount = jest.spyOn(Ranking, "count");
    const spyCreate = jest.spyOn(Ranking, "create");

    await request(app)
      .post("/ranking")
      .send({ name: "number1", time: 30 })
      .expect(OK)
      .expect("Content-Type", /json/)
      .expect({ result: "ok" });

    expect(spyCount).toBeCalledTimes(1);
    expect(spyCreate).toBeCalledTimes(1);
    expect(spyCreate).toBeCalledWith({
      name: "number1",
      time: 30,
    });

    const createdRanking = await Ranking.findOne({ name: "number1", time: 30 });

    expect(createdRanking).toBeTruthy();
  });

  it("should delete 21th ranking when create more than 20", async () => {
    const pendingRequests = [];

    for (let i = 0; i < 20; i++) {
      pendingRequests.push(
        Ranking.create({ name: `number${i}`, time: 30 - i }),
      );
    }

    try {
      await Promise.all(pendingRequests);
    } catch(err) {
      console.log(`error: ${err} cannot create mock ranking`);
    }

    const beforeRankingCount = await Ranking.count({});
    expect(beforeRankingCount).toBe(20);

    await request(app)
      .post("/ranking")
      .send({ name: "number1", time: 10 })
      .expect(OK)
      .expect("Content-Type", /json/)
      .expect({ result: "ok" });

    const afterRankingCount = await Ranking.count({});
    expect(afterRankingCount).toBe(20);

    const twentyFirst = await Ranking.findOne({ name: "number0", time: 30 });
    expect(twentyFirst).toBeFalsy();
  });
});

describe("GET /ranking", () => {
  beforeEach(async () => {
    const pendingRequests = [];

    for (let i = 0; i < 20; i++) {
      pendingRequests.push(
        Ranking.create({ name: `number${i}`, time: 30 - i }),
      );
    }

    try {
      await Promise.all(pendingRequests);
    } catch(err) {
      console.log(`error: ${err} cannot create mock ranking`);
    }
  });

  afterEach(async () => {
    try {
      await Ranking.deleteMany();
    } catch(err) {
      console.log(`error: ${err} cannot delete mock data`);
    }
  });

  it("should response rankings", async () => {
    const spyFind = jest.spyOn(Ranking, "find");

    const res = await request(app)
      .get("/ranking")
      .expect(OK)
      .expect("Content-Type", /json/);

    expect(spyFind).toBeCalledTimes(1);
    expect(res.body).toBeTruthy();
    expect(res.body.ranking).toBeTruthy();

    const ranking = res.body.ranking;
    const isSortedByTime = ranking.slice(0, ranking.length -1)
      .every((data, i) => {
        return data.time < ranking[i + 1].time;
      });

    expect(ranking.length).toBe(20);
    expect(isSortedByTime).toBeTruthy();
  });
});
