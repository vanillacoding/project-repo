const { expect } = require('chai');
const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const testUser = {
  facebookId: '106346727710982',
  name: 'test test',
};

const token = jwt.sign(
  { facebookId: testUser.facebookId, name: testUser.name }, 
  process.env.JWT_KEY, 
  { expiresIn: '3h' },
);

describe('/:id/mycats GET', function() {
  const userId = '5e958c690170a80a58667a16'

  it ('Should get response with 200 status and founder should be userId', function(done) {
    this.timeout(4000);
    request(app)
      .get(`/user/${userId}/mycats`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        const { cats, result } = res.body;
        expect(cats[0].founder).to.equal(userId);
        expect(result).to.equal('ok')
        done();
      });
  });
});

describe('/:id/likedcats GET', function() {
  const userId = '5e958c690170a80a58667a16'

  it ('Should get response with 200 status and founder should be userId', function(done) {
    this.timeout(4000);
    request(app)
      .get(`/user/${userId}/likedcats`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        const { result } = res.body;
        expect(result).to.equal('ok');
        done();
      });
  });
});