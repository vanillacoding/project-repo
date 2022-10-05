const sinon = require('sinon');
const { expect } = require('chai');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const Controller = require('./userControllers');
const userService = require('../services/userService');
const RESPONSE = require('../constants/response');

describe('user Controller', () => {
  let get = () => {
    return;
  };
  let req = {
    get,
  };
  let res = {};
  let next;
  let status;
  let json;

  beforeEach(() => {
    req = {
      ...req,
      params: { userId: {} },
    };
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
    next = sinon.spy();
  });

  describe('getUserInfo', () => {
    it('should execute next function on server error', async () => {
      await Controller.getUserInfo(req, res, next);
      sinon.assert.calledOnce(next);
    });

    it('get user info with status 200', async () => {
      const fakeUserInfo = faker.random.word();
      sinon.stub(userService, 'getUserInfo').returns(fakeUserInfo);
      await Controller.getUserInfo(req, res, next);
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].result).to.equal(RESPONSE.OK);
      expect(json.args[0][0].user).to.equal(fakeUserInfo);
    });
  });

  describe('login', () => {
    const fakeUserId = faker.random.uuid();
    const fakeUserInfo = { _id: fakeUserId };
    const fakeEmail = faker.internet.email();
    const fakeToken = jwt.sign({ fakeUserId, fakeEmail }, 'ricecoco');

    sinon.stub(userService, 'login').returns(fakeUserInfo);

    it('should not login a user when token is expired', async () => {
      const expiredToken = faker.random.number();
      req = {
        ...req,
        headers: {
          authorization: expiredToken,
        },
      };
      await Controller.login(req, res, next);
      expect(status.args[0][0]).to.equal(401);
      expect(json.args[0][0].result).to.equal(RESPONSE.UNAUTHORIZED);
    });

    it('should login a user when token is provided', async () => {
      sinon.stub(jwt, 'verify').returns(fakeToken);
      req = {
        ...req,
        headers: {
          authorization: fakeToken,
        },
      };
      await Controller.login(req, res, next);
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].result).to.equal(RESPONSE.OK);
      expect(json.args[0][0].user).to.equal(fakeUserInfo);
    });
  });
});
