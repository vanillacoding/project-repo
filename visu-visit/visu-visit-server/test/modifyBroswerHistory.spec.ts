import mongoose from "mongoose";
import { after, before, describe, it } from "mocha";
import request from "supertest";
import { expect } from "chai";

import { IBrowserHistory } from "../src/types/history.type";
import BrowserHistory from "../src/models/BrowserHistory";
import mockBrowserHistory from "./mockData/mockBrowserHistory.json";
import modifiedMockBrowserHistory from "./mockData/mockBrowserHistory-modified.json";
import server from "../src/server";

describe("modifyBrowserHistory test", function callback() {
  this.timeout(10000);

  const db = mongoose.connection;
  const id = mockBrowserHistory.nanoId;

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

  it("SAVE browserHistory by ID", (done) => {
    request(server)
      .put(`/browser-history/${id}`)
      .send(modifiedMockBrowserHistory)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        (async () => {
          try {
            const { totalVisits, domainNodes } = (await BrowserHistory.findOne({
              nanoId: id,
            })
              .lean()
              .exec()) as IBrowserHistory;

            expect(
              modifiedMockBrowserHistory.totalVisits.every(
                (visit, index) => visit.targetUrl === totalVisits[index].targetUrl,
              ),
            ).to.equal(true);
            expect(
              modifiedMockBrowserHistory.domainNodes.every(
                (domain, index) => domain.name === domainNodes[index].name,
              ),
            ).to.equal(true);

            expect(modifiedMockBrowserHistory.totalVisits.length).to.equal(totalVisits.length);
            expect(modifiedMockBrowserHistory.domainNodes.length).to.equal(domainNodes.length);
            expect(res.body.result).to.equal("ok");
            done();
          } catch (error) {
            done(error);
          }
        })();
      });
  });

  it("should handle when modify with non-exist ID", (done) => {
    const randomId = "non-exist-id";

    request(server)
      .put(`/browser-history/${randomId}`)
      .send(modifiedMockBrowserHistory)
      .expect(500)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.result).to.equal("error");
        expect(res.body.error.code).to.equal(2007);
        expect(res.body.error.message).to.equal("해당 ID의 히스토리는 존재하지 않습니다.");
        done();
      });
  });
});
