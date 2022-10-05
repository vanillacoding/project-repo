const { expect } = require('chai');
const sinon = require('sinon');
const historyService = require('../../services/history.service');
const { RES_RESULT } = require('../../constants');

const { sendHistory } = require('./histories.controller');

const savedHistoryService = historyService.getHistoryByGameId;
const FAKE_VALUE = 'FAKE_VALUE';

beforeEach(() => {
  historyService.getHistoryByGameId = () => {
    return Promise.resolve(FAKE_VALUE);
  };
});

afterEach(() => {
  historyService.getHistoryByGameId = savedHistoryService;
});

describe('histories controller test', () => {
  it('should return history info', async () => {
    const FAKE_USER = 'FAKE_USER';
    const FAKE_PARAMS = 'FAKE_PARAMS';
    const req = {
      params: FAKE_PARAMS,
    };
    const res = {
      locals: {
        user: FAKE_USER,
      },
      json: sinon.spy(),
      status: sinon.spy(),
    };
    const next = sinon.spy();

    await sendHistory(req, res, next);

    expect(res.status.args[0][0]).eql(200);
    expect(res.json.args[0][0]).eql({ result: RES_RESULT.OK, data: FAKE_VALUE });
  });
});
