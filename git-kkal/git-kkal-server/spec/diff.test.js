const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const MOCK_DIFF_DATA = JSON.stringify(require('./diffData.json'));

const MOCK_REPO_URL = 'https://github.com/chiwon1/git-kkal-server-test-mock-up';
const MOCK_COMMIT_HASH = '45bf8c925fa509a9c29d6f1e2d718e3f327251f9';
const INVALID_COMMIT_HASH = 'invalid';

describe('GET `/repository/diff`', () => {
  describe('valid repo url and commit hash', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get(
          `/repository/diff?repoUrl=${MOCK_REPO_URL}&commitHash=${MOCK_COMMIT_HASH}`
        )
        .expect(200)
        .end(done);
    });

    it('should response with correct data', (done) => {
      request(app)
        .get(
          `/repository/diff?repoUrl=${MOCK_REPO_URL}&commitHash=${MOCK_COMMIT_HASH}`
        )
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.text).to.include(MOCK_DIFF_DATA);
          done();
        });
    });
  });

  it('should respond with 404 for invalid commit hash', (done) => {
    request(app)
      .get(
        `/repository/diff?repoUrl=${MOCK_REPO_URL}&commitHash=${INVALID_COMMIT_HASH}`
      )
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.eql({ error: 'Failed to get diff' });
        done();
      });
  });
});
