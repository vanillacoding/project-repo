const request = require("supertest");
const { expect } = require("chai");
const { server } = require("../server");
const { createToken } = require("../utils/tokenHandler");

describe("Auth Controller Test", () => {
  const authorizedPlayerId = "1377fcbb-3e6b-4752-b04c-ca3335ce7b2c";
  const authorizedEmail = "temp@temp.temp";
  const authorizedDisplayName = "CLOVER";

  const unauthorizedPlayerId = "12345";

  it("POST - check authorization (authorized)", (done) => {
    request(server)
      .post("/api/check_auth")
      .send({
        token: createToken(authorizedPlayerId),
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) { return done(err) }
        expect(res.body.message).to.equal("Authorization Success");
        expect(res.body.data).to.be.instanceOf(Object);

        done();
      });
  });

  it("POST - check authorization (unauthorized)", (done) => {
    request(server)
      .post("/api/check_auth")
      .send({
        token: createToken(unauthorizedPlayerId),
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) { return done(err) }
        expect(res.body.message).to.equal("Unauthorized");

        done();
      });
  });

  it("POST - login", (done) => {
    request(server)
      .post("/api/login")
      .send({
        email: authorizedEmail,
        uid: authorizedPlayerId,
        displayName: authorizedDisplayName,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) { return done(err) }
        expect(res.body.message).to.equal("Log In Success");

        done();
      });
  });
});
