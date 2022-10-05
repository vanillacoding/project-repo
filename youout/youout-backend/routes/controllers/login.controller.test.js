const { expect } = require('chai');
const sinon = require('sinon');
const userService = require('../../services/user.service');
const { RES_RESULT } = require('../../constants');
const util = require('util');

const FAKE_ID = 'FAKE_ID';
const FAKE_VALUE = 'fakeValue';

const savedLoginUser = userService.loginUser;

beforeEach(() => {
  util.promisify = () => Promise.resolve(FAKE_VALUE);
  sinon.stub(util, 'promisify').returns(() => Promise.resolve(FAKE_VALUE));
  userService.loginUser = () => {
    return Promise.resolve({ _id: FAKE_ID });
  };
});

afterEach(() => {
  sinon.restore();
  userService.loginUser = savedLoginUser;
});

describe('login controller test', () => {
  it('should send user info with token', async () => {
    const { login } = require('./login.controller');

    const FAKE_NAME = 'FAKE_NAME';
    const FAKE_EMAIL = 'FAKE_EMAIL';
    const FAKE_IMAGE = 'FAKE_IMAGE';
    const FAKE_USER = 'FAKE_USER';

    const req = {
      body: {
        name: FAKE_NAME,
        email: FAKE_EMAIL,
        image: FAKE_IMAGE,
      }
    };
    const res = {
      locals: {
        user: FAKE_USER,
      },
      status: sinon.spy(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    const user = {
      name: FAKE_NAME,
      email: FAKE_EMAIL,
      image: FAKE_IMAGE,
      id: FAKE_ID,
    };

    await login(req, res, next);

    expect(res.json.args[0][0]).eql({ result: RES_RESULT.OK, data: { token: FAKE_VALUE, user }});
  });
});
