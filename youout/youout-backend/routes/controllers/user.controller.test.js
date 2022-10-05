const { expect } = require('chai');
const sinon = require('sinon');
const { RES_RESULT } = require('../../constants');

const { sendUserInfo } = require('./user.controller');

describe('user controller test', () => {
  it('should return user info', () => {
    const FAKE_USER = 'fakeUser';
    const req = {};
    const res = {
      locals: {
        user: FAKE_USER,
      },
      json: sinon.spy(),
    };
    const next = sinon.spy();

    sendUserInfo(req, res, next);
    expect(res.json.args[0][0]).eql({ result: RES_RESULT.OK, data: { user: FAKE_USER } });
  });
});
