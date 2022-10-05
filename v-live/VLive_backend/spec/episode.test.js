const request = require('supertest');
const { expect } = require('chai');
const { describe, it, after, before } = require('mocha');

const app = require('../app');
const Episode = require('../models/Episode');
const { ERR_MSG } = require('../constants/errors/errorMessage');

const mockUser = {
  email: 'user-email@gmail.com',
  name: 'user-name',
  photoUrl: 'user-photo-url',
};

describe('GET `/episode`', function () {
  this.timeout(10000);

  it('should get all episodes from database and return in response', (done) => {
    request(app)
      .get('/episode')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const { data, result } = res.body;
        const allEpisodes = await Episode.find().lean();

        expect(result).to.eql('ok');
        expect(allEpisodes.length).to.eql(data.length);
        expect(data).to.be.instanceOf(Array);

        done();
      });
  });
});

describe('GET `/episode/:episodeId`', function () {
  this.timeout(10000);
  let token = '';

  before((done) => {
    request(app)
      .post('/login')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.data.token;
        done();
      });
  });

  after(() => {
    token = '';
  });

  const episodeId = '6135b2b8e3f537719f72d05d';

  describe('GET `/episode/:episodeId`(unauthenticated user)', function () {
    it('should get one episode data with the episodeId', (done) => {
      request(app)
        .get(`/episode/${episodeId}`)
        .set('x-access-token', 'Bearer invalidToken')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);

          const { result, message } = res.body;

          expect(result).eql('error');
          expect(message).eql(ERR_MSG.INVALID_TOKEN);

          done();
        });
    });
  });

  describe('GET `/episode/:episodeId`(authenticated user)', function () {
    it('should get one episode data with the episodeId', (done) => {
      request(app)
        .get(`/episode/${episodeId}`)
        .set('authorization', `bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const { data, result } = res.body;

          expect(result).eql('ok');

          expect(data).to.exist;
          expect(data._id).to.exist;
          expect(data._id).to.eql(episodeId);

          expect(data.characters).to.exist;
          expect(data.characters).to.be.instanceOf(Array);
          done();
        });
    });
  });
});
