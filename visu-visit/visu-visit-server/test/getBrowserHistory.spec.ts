import mongoose from "mongoose";
import { after, before, describe, it } from "mocha";
import request from "supertest";
import { expect } from "chai";

import { IBrowserHistory } from "../src/types/history.type";
import BrowserHistory from "../src/models/BrowserHistory";
import mockBrowserHistory from "./mockData/mockBrowserHistory.json";
import server from "../src/server";

describe("getBrowserHistory test", function callback() {
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

  it("GET whole browserHistory by its ID", (done) => {
    request(server)
      .get(`/browser-history/${id}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.result, "ok");
        expect(res.body.data).to.deep.equal(mockBrowserHistory);
        expect(res.body.data.totalVisits.length).to.equal(22);
        expect(res.body.data.domainNodes.length).to.equal(8);
        done();
      });
  });

  it("GET filtered browserHistory by duration", (done) => {
    const UTC_SEOUL_HOUR_DIFFERENCE = 1000 * 60 * 60 * 9;

    request(server)
      .get(`/browser-history/${id}?start=2021-10-14&end=2021-10-15`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        const { totalVisits, domainNodes } = mockBrowserHistory;

        expect(
          totalVisits.every(({ visitTime }) => {
            const visitDate = new Date(new Date(visitTime).getTime() + UTC_SEOUL_HOUR_DIFFERENCE);

            return new Date("2021-10-14") <= visitDate && visitDate < new Date("2021-10-16");
          }),
        ).to.equal(true);

        expect(
          domainNodes.every(({ lastVisitTime }) => {
            const visitDate = new Date(
              new Date(lastVisitTime).getTime() + UTC_SEOUL_HOUR_DIFFERENCE,
            );

            return new Date("2021-10-14") <= visitDate && visitDate < new Date("2021-10-16");
          }),
        ).to.equal(true);

        expect(res.body.result, "ok");
        expect(res.body.data.totalVisits.length).to.equal(22);
        expect(res.body.data.domainNodes.length).to.equal(8);
        done();
      });
  });

  it("GET whole browserHistory by domain name", (done) => {
    request(server)
      .get(`/browser-history/${id}?domain=naver`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        const { totalVisits, domainNodes }: IBrowserHistory = res.body.data;

        expect(
          totalVisits.every(
            ({ targetUrl, sourceUrl }) =>
              new URL(targetUrl).origin.includes("naver") ||
              (sourceUrl && new URL(sourceUrl).origin.includes("naver")),
          ),
        ).to.equal(true);

        expect(domainNodes.every(({ name }) => name.includes("naver"))).to.equal(true);

        expect(res.body.result, "ok");
        done();
      });
  });
});
