const { expect } = require('chai');
const app = require('../app');
const request = require('supertest');
const User = require('../models/User');

describe('auth', function() {
  const login = '/auth/login';
  const testUser = {
    facebookId : 'test',
    name : 'John Snow',
  };

  after(function(done) {
    User.findOneAndDelete({ name: testUser.name }, (err, user) => {
      done();
    });
  });

  it ('Should get response with 200 status with facebook Id and name', function(done) {
    this.timeout(10000);
    request(app)
      .post(login)
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).to.equal('ok');
        expect(res.body.user.facebookId).to.equal('test');
        expect(res.body.user.name).to.equal('John Snow');
        done();
      });
  });
});
