import mongoose from "mongoose";
import { after, before, describe, it } from "mocha";
import request from "supertest";
import { expect } from "chai";

import { IBrowserHistory } from "../src/types/history.type";
import BrowserHistory from "../src/models/BrowserHistory";
import mockBrowserHistory from "./mockData/mockBrowserHistory.json";
import server from "../src/server";
import mockHistoryQueryResult from "./mockData/mockHistoryQueryResult";

describe("saveBrowserHistory test", function callback() {
  this.timeout(10000);

  const db = mongoose.connection;
  const id = "mock-id";

  before((done) => {
    const checkDatabaseConnection = () => {
      if (db.readyState === 1) {
        done();
        return;
      }

      setTimeout(checkDatabaseConnection, 1000);
    };

    checkDatabaseConnection();
  });

  before((done) => {
    (async () => {
      try {
        await BrowserHistory.create(mockBrowserHistory);
        done();
      } catch (error) {
        done(error);
      }
    })();
  });

  after((done) => {
    (async () => {
      try {
        await BrowserHistory.deleteOne({ nanoId: id });
        done();
      } catch (error) {
        done(error);
      }
    })();
  });

  it("SAVE browserHistory by History.db file", (done) => {
    request(server)
      .post(`/browser-history/${id}`)
      .attach("historyFile", "test/mockData/mockHistory.db")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.result).to.equal("ok");
        expect(res.body.data.nanoId).to.deep.equal(mockHistoryQueryResult.nanoId);

        (async () => {
          try {
            const { totalVisits } = (await BrowserHistory.findOne({
              nanoId: id,
            })
              .lean()
              .exec()) as IBrowserHistory;

            totalVisits.sort((a, b) => a.visitId - b.visitId);

            const { totalVisits: mockTotalVisits } = mockHistoryQueryResult;

            mockTotalVisits.sort((a, b) => a.visitId - b.visitId);

            expect(
              totalVisits.every(
                (visit, index) => visit.targetUrl === mockTotalVisits[index].targetUrl,
              ),
            ).to.equal(true);

            done();
          } catch (error) {
            done(error);
          }
        })();
      });
  });

  it("should handle when invalid file passed", (done) => {
    const randomId = "non-exist-id";

    request(server)
      .post(`/browser-history/${randomId}`)
      .attach("historyFile", "test/mockData/fakeFile")
      .expect(500)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.result).to.equal("error");
        expect(res.body.error.code).to.equal(2000);
        expect(res.body.error.message).to.equal(
          "히스토리 파일을 서버에서 처리하는 중에 에러가 발생했습니다.",
        );
        done();
      });
  });
});
