require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const {
  savedMockData,
  slideOrderList,
  originalPptId,
  comparablePptId,
  mergeData,
  mergedPptId,
  mergedPpt,
  failureId,
  failureData,
} = require("../__mocks__/mock");

let agent;

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(process.env.MONGODB_URL);

  agent = request.agent(app);
});

afterAll(async () => {
  await mongoose.disconnect();
});

it("Post /ppts/save 요청을 확인합니다.", async () => {
  await agent.post("/ppts/save").send(savedMockData).expect(200);
});

describe("Post /ppts/compare 요청을 확인합니다.", () => {
  it("Post /ppts/compare 요청중 comparablePptId가 정상적으로 들어왔을 경우를 체크합니다.", async () => {
    const checkdData = await agent
      .post("/ppts/compare")
      .send({ originalPptId, comparablePptId });

    expect(JSON.parse(checkdData.text)).toEqual(mergeData);
  });

  it("Post /ppts/compare   originalPptId가 정상적으로 들어오지 않을 경우 오류를 출력합니다.", async () => {
    await agent
      .post("/ppts/compare")
      .send({ failureId, comparablePptId })
      .expect(500);
  });

  it("Post /ppts/compare 요청 중 comparablePptId가 정상적으로 들어오지 않을 경우 오류를 출력합니다.", async () => {
    await agent
      .post("/ppts/compare")
      .send({ originalPptId, failureId })
      .expect(500);
  });
});

describe("Post /ppts/merge 요청을 확인합니다.", () => {
  it("Post /ppts/merge 요청이 정상적으로 들어온 경우를 확인합니다.", async () => {
    await agent
      .post("/ppts/merge")
      .send({ originalPptId, comparablePptId, mergeData, slideOrderList })
      .expect(200);
  });

  it("Post /ppts/merge 요청 중 합칠 데이터가 비상정일 경우 오류를 출력합니다.", async () => {
    await agent
      .post("/ppts/merge")
      .send({ originalPptId, comparablePptId, failureData, slideOrderList })
      .expect(500);
  });
});

describe("Get /:ppt_id/download 요청을 확인합니다", () => {
  it("Get /:ppt_id/download 요청이 정상적으로 들어온 경우를 확인합니다.", async () => {
    const checkedData = await agent
      .get(`/${mergedPptId}/download`)
      .query({ mergedPptId });
    expect(JSON.parse(checkedData.text)).toEqual(mergedPpt);
  });

  it("Get /:ppt_id/download 요청 중 ppt_id가 없을 경우 오류를 출력합니다.", async () => {
    await agent.get(`/${failureId}/download`).query({ failureId }).expect(500);
  });
});
