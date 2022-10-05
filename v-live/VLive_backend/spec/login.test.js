const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');
const { tokenSecretKey } = require('../configs/index');
const { before } = require('mocha');

const mockUser = {
  email: 'user-email@gmail.com',
  name: 'user-name',
  photoUrl: 'user-photo-url',
};

describe('POST `/login`', function () {
  this.timeout(10000);

  const removeMockUser = async () => {
    await User.deleteOne({ name: mockUser.name });
  };

  const createMockUser = async () => {
    await User.create(mockUser);
  };

  afterEach(removeMockUser);

  it('should add new user if non-joined user request login, and should response with token and userInfo', (done) => {
    request(app)
      .post('/login')
      .type('json')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const { result, data } = res.body;

        expect(result).to.exist;
        expect(result).to.eql('ok');

        expect(data.user).to.exist;
        expect(data.user.name).to.eql(mockUser.name);

        expect(data.token).to.exist;

        const payload = await jwt.verify(data.token, tokenSecretKey);
        delete payload.iat;

        expect(payload).to.eql(mockUser);

        const newUser = await User.findOne({ name: mockUser.name }).lean();
        expect(newUser).to.exist;

        done();
      });
  });
  it('should response with token and userInfo If joined user request login', (done) => {
    before(createMockUser);

    request(app)
      .post('/login')
      .type('json')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const { result, data } = res.body;

        expect(result).to.exist;
        expect(result).to.equal('ok');

        expect(data.user).to.exist;

        expect(data.token).to.exist;

        const payload = await jwt.verify(data.token, tokenSecretKey);
        delete payload.iat;

        expect(payload).to.eql(mockUser);

        done();
      });
  });
});
