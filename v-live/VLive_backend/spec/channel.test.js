const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');

const { ERR_MSG } = require('../constants/errors/errorMessage');
const Channel = require('../models/Channel');

const mockHost = {
  email: 'host-email@gmail.com',
  name: 'host-name',
  photoUrl: 'host-photo-url',
};

const mockPlayer = {
  email: 'player-email@gmail.com',
  name: 'player-name',
  photoUrl: 'player-photo-url',
};

const mockChannel = {
  name: '어서오세요',
  episodeId: '6135b2b8e3f537719f72d05d',
  host: '61385ce07f4738f470c8496b',
};

describe('channel controller test', function () {
  this.timeout(10000);

  let channelId;

  const deleteMockData = async () => {
    await Channel.deleteOne({ name: mockChannel.name });
  };

  const storeMockChannel = async () => {
    const newChannel = await Channel.create(mockChannel);

    channelId = newChannel._id;
  };

  describe('POST `/channel`', function () {
    afterEach(deleteMockData);

    it('should add a new channel into database', (done) => {
      request(app)
        .post('/login')
        .send(mockHost)
        .end((err, res) => {
          if (err) return done(err);

          const token = res.body.data.token;
          const host = res.body.data.user._id;

          request(app)
            .post('/channel')
            .expect('Content-Type', /json/)
            .set('authorization', `bearer ${token}`)
            .send({ ...mockChannel, host })
            .expect(200)
            .end(async (err, res) => {
              if (err) return done(err);

              const { result, data, message } = res.body;

              expect(result).to.exist;
              expect(result).to.equal('ok');

              expect(data).to.exist;
              expect(data._id).to.exist;
              expect(mongoose.Types.ObjectId.isValid(data._id)).to.be.true;

              expect(data.host).to.exist;
              expect(data.host).to.equal(host);

              expect(data.players).to.exist;
              expect(data.players).to.be.empty;

              expect(data.isPlaying).to.exist;
              expect(data.isPlaying).to.be.false;

              expect(data.isActive).to.exist;
              expect(data.isActive).to.be.true;

              expect(message).to.be.undefined;

              const addedChannel = await Channel.findOne({
                name: mockChannel.name,
              });

              expect(addedChannel).to.exist;

              done();
            });
        });
    });

    it('should NOT add a new channel into database', (done) => {
      request(app)
        .post('/channel')
        .expect('Content-Type', /json/)
        .set('authorization', 'bearer invalidToken')
        .send(mockChannel)
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          const { result, data, message } = res.body;

          expect(result).to.exist;
          expect(result).to.equal('error');

          expect(data).to.be.undefined;

          expect(message).to.exist;
          expect(message).to.equal(ERR_MSG.INVALID_TOKEN);

          const addedChannel = await Channel.findOne({
            name: mockChannel.name,
          });

          expect(addedChannel).to.be.null;

          done();
        });
    });
  });

  describe('PUT `/channel/:channelId`', function () {
    beforeEach(storeMockChannel);
    afterEach(deleteMockData);

    it('should update existing channel', (done) => {
      request(app)
        .post('/login')
        .send(mockPlayer)
        .end((err, res) => {
          if (err) return done(err);

          const token = res.body.data.token;
          const user = res.body.data.user;

          request(app)
            .put(`/channel/${channelId}`)
            .expect('Content-Type', /json/)
            .set('authorization', `bearer ${token}`)
            .send({
              state: 'enter',
              userId: user._id,
            })
            .expect(200)
            .end(async (err, res) => {
              if (err) return done(err);

              const { result, data, message } = res.body;

              expect(result).to.exist;
              expect(result).to.eql('ok');

              expect(data).to.be.undefined;

              expect(message).to.be.undefined;

              const updatedChannel = await Channel.findOne({ _id: channelId });
              const isUpdated = updatedChannel.players.some(
                (player) => player.user.toString() === user._id,
              );

              expect(isUpdated).to.be.true;

              done();
            });
        });
    });

    it('should NOT update if channel is not existing', (done) => {
      request(app)
        .post('/login')
        .send(mockPlayer)
        .end((err, res) => {
          if (err) return done(err);

          const token = res.body.data.token;
          const user = res.body.data.user;

          request(app)
            .put('/channel/invalidChannelId')
            .expect('Content-Type', /json/)
            .set('authorization', `bearer ${token}`)
            .send({
              state: 'enter',
              userId: user._id,
            })
            .expect(400)
            .end(async (err, res) => {
              if (err) return done(err);

              const { result, data, message } = res.body;

              expect(result).to.be.exist;
              expect(result).to.eql('error');

              expect(message).to.be.exist;
              expect(message).eql(ERR_MSG.BAD_REQUEST);

              expect(data).to.be.undefined;

              done();
            });
        });
    });

    it('should NOT update if user is not authenticated', (done) => {
      request(app)
        .put('/channel/invalidChannelId')
        .expect('Content-Type', /json/)
        .set('authorization', 'bearer invalidToken')
        .send({
          state: 'start',
        })
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          const { result, data, message } = res.body;

          expect(result).exist;
          expect(result).eql('error');

          expect(data).to.be.undefined;

          expect(message).exist;
          expect(message).eql(ERR_MSG.INVALID_TOKEN);

          done();
        });
    });
  });
});
