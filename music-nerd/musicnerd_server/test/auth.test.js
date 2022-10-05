const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('auth controller', function () {
  this.timeout(10000);

  const mongoose = require('mongoose');
  const db = mongoose.connection;
  const User = require('../models/User');
  const mockUser = require('./mockUsers.json');
  let storedUsers;

  const storeMockUsers = async () => {
    for (let i = 0; i < mockUser.length; i++) {
      await new User(mockUser[i]).save();
    }
  };

  const fetchMockUsers = done => {
    storeMockUsers().then(() => {
      User.find().lean().exec((err, users) => {
        if (err) return done(err);
        storedUsers = JSON.parse(JSON.stringify(users));
        done();
      });
    });
  };

  const deleteMockUsers = done => {
    User.deleteMany({}, err => {
      if (err) return done(err);
      storedUsers = null;
      done();
    });
  };

  before(done => {
    (function checkDBConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDBConnection, 1000);
    })();
  });

  describe('[POST] /auth/signup', () => {
    beforeEach(fetchMockUsers);
    afterEach(deleteMockUsers);

    it('should respond with 400 when username is longer than 8 characters.', done => {
      request(app)
        .post('/auth/signup')
        .send({
          username: '123456789',
          email: 'test@test.com',
          password: 'secret1234',
          confirmationPassword: 'secret1234'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.errorMessage).to.equal('Username should be less than 8 characters.');
          done();
        })
    });

    it('should respond with 400 when password and confirmation does not match.', done => {
      request(app)
        .post('/auth/signup')
        .send({
          username: '12345678',
          email: 'test@test.com',
          password: 'secret1234',
          confirmationPassword: 'notsecret1234'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.errorMessage).to.equal('Password does not match.');
          done();
        })
    });

    it('should respond with 400 when same username already exists in DB.', done => {
      request(app)
        .post('/auth/signup')
        .send({
          username: 'test1',
          email: 'test10@email.com',
          password: 'secret1234',
          confirmationPassword: 'secret1234'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.errorMessage).to.equal('Username already taken.');
          done();
        })
    });

    it('should respond with 400 when same email already exists in DB.', done => {
      request(app)
        .post('/auth/signup')
        .send({
          username: 'test9',
          email: 'test1@email.com',
          password: 'secret1234',
          confirmationPassword: 'secret1234'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.errorMessage).to.equal('Email address already taken.');
          done();
        })
    });

    it('should save user if condition mets', done => {
      request(app)
        .post('/auth/signup')
        .send({
          username: 'newUser',
          email: 'user@email.com',
          password: 'secret123123',
          confirmationPassword: 'secret123123'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          done();
        });
    });
  });
});
