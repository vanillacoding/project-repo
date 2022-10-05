const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const MOCK_REPO_DATA = JSON.stringify(require('./repoData.json'));

const MOCK_REPO_URL = 'https://github.com/chiwon1/git-kkal-server-test-mock-up';
const INVALID_REPO_URL = 'https://invalid.com/invalid/invalid';

describe('GET `/repository`', () => {
  describe('valid repo url', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get(`/repository?repoUrl=${MOCK_REPO_URL}`)
        .expect(200)
        .end(done);
    });

    it('should response with correct data', (done) => {
      request(app)
        .get(`/repository?repoUrl=${MOCK_REPO_URL}`)
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);
          expect(res.text).to.include(MOCK_REPO_DATA);
          done();
        });
    });
  });

  it('should respond with 400 for invalid repo url', (done) => {
    request(app)
      .get(`/repository?repoUrl=${INVALID_REPO_URL}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.eql({ error: 'Fail to clone' });
        done();
      });
  });
});
