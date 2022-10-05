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

  describe('[GET] /users/:userId', () => {
    beforeEach(fetchMockUsers);
    afterEach(deleteMockUsers);

    it('should return data to authenticated user', async () => {
      let mockToken;

      const jwt = require('jsonwebtoken');
      const payload = { userId: storedUsers[0]._id };

      await jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 1000 * 60 * 60 },
        (err, token) => {
          if (err) {
            console.error('jwt sign error', err);
            return res.status(500).json({
              errorMessage: 'Server error. Please try again.'
            });
          }

          mockToken = token;
        }
      );

      request(app)
        .get(`/users/${storedUsers[0]._id}/favorites`)
        .set('x-access-token', mockToken)
        .expect(200)
    });

    it('should not give information to not authenticated user', () => {
      request(app)
        .get(`/users/${storedUsers[0]._id}/favorites`)
        .set('x-access-token', 'fake token')
        .expect(401)
        .end((err, res) => {
          expect(res.body.errorMessage).to.equal('Invalid Token.');
        });
    });
  });
});
