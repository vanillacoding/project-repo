const { expect } = require('chai');
const sinon = require('sinon');
const util = require('util');
const { RES_RESULT, RES_MESSAGE } = require('../constants');

const FAKE_VALUE = 'fakeValue';

beforeEach(() => {
  sinon.stub(util, 'promisify').returns(() => Promise.resolve(FAKE_VALUE));
});

afterEach(() => {
  sinon.restore();
});

describe('middleware test', () => {
  it('should set value if have token', async () => {
    const verifyToken = require('./verifyToken');

    const FAKE_TOKEN = 'FAKE_TOKEN';
    const req = {
      headers: {
        authorization: FAKE_TOKEN,
      }
    };
    const res = {
      locals: {
        user: null,
      },
      status: sinon.spy(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    await verifyToken(req, res, next);

    expect(res.locals.user).eql(FAKE_VALUE);
    expect(next.callCount).eql(1);
  });

  it('should send json if dont have token', async () => {
    const verifyToken = require('./verifyToken');

    const FAKE_TOKEN = null;
    const req = {
      headers: {
        authorization: FAKE_TOKEN,
      }
    };
    const res = {
      locals: {
        user: null,
      },
      status: sinon.spy(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    await verifyToken(req, res, next);

    expect(res.status.args[0][0]).eql(401);
    expect(res.json.args[0][0]).eql({
      result: RES_RESULT.FAIL,
      message: RES_MESSAGE.UNAUTHORIZED,
    });
  });
});
