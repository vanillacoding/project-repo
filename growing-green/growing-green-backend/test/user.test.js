const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');
const { tokenSecretKey } = require('../configs');
const { before } = require('mocha');

const mockUser = {
  email: 'sample@google.com',
  name: 'smaple kim',
  photoURL: 'sample-url',
};

describe('POST /users', function () {
  async function removeMockUser() {
    await User.deleteOne({ name: mockUser.name });
  }

  async function createMockUser() {
    await User.create(mockUser);
  }

  afterEach(removeMockUser);
  this.timeout(5000);
  it('should add new user if non-joined user request login, and should response with token and userInfo', (done) => {
    request(app)
      .post('/users/login')
      .type('json')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);

        const { token, user } = res.body;

        expect(user).to.exist;
        expect(user.name).to.eql(mockUser.name);

        expect(token).to.exist;

        const payload = await jwt.verify(token, tokenSecretKey);
        delete payload.iat;

        expect(payload.name).to.eql(mockUser.name);

        const newUser = await User.findOne({ name: mockUser.name }).lean();
        expect(newUser).to.exist;

        done();
      });
  });

  it('should response with token and userInfo If joined user request login', (done) => {
    before(createMockUser);

    request(app)
      .post('/users/login')
      .type('json')
      .send(mockUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);

        const { user, token } = res.body;

        expect(user).to.exist;
        expect(token).to.exist;

        const payload = await jwt.verify(token, tokenSecretKey);
        delete payload.iat;

        expect(payload.name).to.eql(mockUser.name);

        done();
      });
  });
});
