import mongoose from "mongoose";
import { after, before, describe, it } from "mocha";
import request from "supertest";
import { expect } from "chai";

import BrowserHistory from "../src/models/BrowserHistory";
import mockBrowserHistory from "./mockData/mockBrowserHistory.json";
import server from "../src/server";

describe("deleteBrowserHistory test", function callback() {
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

  it("DELETE browserHistory by its ID", (done) => {
    request(server)
      .delete(`/browser-history/${id}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.result).to.equal("ok");

        (async () => {
          try {
            const result = await BrowserHistory.findOne({ nanoId: id }).lean().exec();

            expect(result).to.equal(null);

            done();
          } catch (error) {
            done(error);
          }
        })();
      });
  });

  it("should handle when delete with non-exist ID", (done) => {
    const randomId = "non-exist-id";

    request(server)
      .delete(`/browser-history/${randomId}`)
      .expect(400)
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
