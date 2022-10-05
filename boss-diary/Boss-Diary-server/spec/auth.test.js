const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const User = require('../models/User');
require('dotenv').config();

describe('/api', function() {
  this.timeout(20000);
  const mongoose = require('mongoose');
  const db = mongoose.connection;

  const mockUser = {
    email: 'test@test.com',
    name: 'testA',
    profilePhoto: 'http://ddd'
  };

  const deleteAllData = done => {
    User.deleteMany({}, err => {
      if (err) return done(err);

      done();
    });
  };

  before(done => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  after(done => {
    return deleteAllData(done);
  });

  /*

  Create or Login User

  */

  describe('POST /auth/authenticate', () => {
    it('should add or find login user into the database', done => {
      request(app)
        .post('/api/auth/authenticate')
        .send(mockUser)
        .end(async(err, res) => {
          if (err) return done(err);

          expect(res.body.message).to.exist;
          expect(res.body.message).to.eql('Logged in successfully');

          const userId = res.body.user_id;
          const accessToken = res.body.access_token;

          expect(res.body.user_id).to.exist;
          expect(mongoose.Types.ObjectId.isValid(userId)).to.be.true;

          expect(res.body.access_token).to.exist;
          expect(res.body.access_token).to.eql(accessToken);

          const addedUser = await User.findById(userId);

          expect(addedUser).to.exist;

          done();
        });
    });
  });
});
