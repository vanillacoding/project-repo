const sinon = require('sinon');
const { expect } = require('chai');

const { RES_RESULT } = require('../../constants');
const { sendGames } = require('./games.controller');
const gameService = require('../../services/game.service');

const FAKE_VALUE = 'FAKE_VALUE';

beforeEach(() => {
  sinon.stub(gameService, 'findByLocation').returns(Promise.resolve(FAKE_VALUE));
  sinon.stub(gameService, 'findByHistory').returns(Promise.resolve(FAKE_VALUE));
  sinon.stub(gameService, 'findByUser').returns(Promise.resolve(FAKE_VALUE));
});

afterEach(() => {
  sinon.restore();
});

describe('games controller test', () => {
  it('should call findByLocation if query`s type is "location"', async () => {
    const req = { query: { type: 'location' }};
    const res = { json: sinon.spy() };
    const next = sinon.spy();

    await sendGames(req, res, next);

    expect(gameService.findByLocation.callCount).eql(1);
    expect(res.json.args[0][0]).eql({ result: RES_RESULT.OK, data: FAKE_VALUE });
  });

  it('should call findByHistory if query`s type is "user" ans selection is history', async () => {
    const FAKE_ID = 'FAKE_ID';
    const req = { query: { type: 'user', selection: 'history' }};
    const res = { json: sinon.spy(), locals: { user: { id: FAKE_ID }}};
    const next = sinon.spy();

    await sendGames(req, res, next);

    expect(gameService.findByHistory.callCount).eql(1);
    expect(res.json.args[0][0]).eql({ result: RES_RESULT.OK, data: FAKE_VALUE });
  });

  it('should call findByUser if query`s type is "user" ans selection is games', async () => {
    const FAKE_ID = 'FAKE_ID';
    const req = { query: { type: 'user', selection: 'games' }};
    const res = { json: sinon.spy(), locals: { user: { id: FAKE_ID } } };
    const next = sinon.spy();

    await sendGames(req, res, next);

    expect(gameService.findByUser.callCount).eql(1);
    expect(res.json.args[0][0]).eql({ result: RES_RESULT.OK, data: FAKE_VALUE });
  });

  it('other path should return bad request', async () => {
    const FAKE_ID = 'FAKE_ID';
    const req = { query: { type: 'none', selection: 'none' } };
    const res = { json: sinon.spy(), status: sinon.spy(), locals: { user: { id: FAKE_ID } } };
    const next = sinon.spy();

    await sendGames(req, res, next);

    expect(res.status.args[0][0]).eql(400);
  });
});
