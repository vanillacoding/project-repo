const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Hashtag = require('../models/Hashtag');
const Comment = require('../models/Comment');

/* 
  Get Hashtags
*/

describe('GET /api/hashtags/:hashtag_id', function () {
  this.timeout(10000);

  it('Should respond by creating comment list with the hashtag ID', (done) => {
    request(app)
      .get('/api/hashtags/5e95d86a2f25182fa71fff76')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const hashtagList = [];
        const hashtagData = await Hashtag.findById('5e95d86a2f25182fa71fff76');
        const hashtagId = hashtagData._id;
        const hashtagName = hashtagData.hashtag;
        const comments = await Comment.find()
          .populate('hashtags')
          .populate('author');

        comments.forEach((comment) => {
          comment.hashtags.forEach((hashtag) => {
            if (String(hashtag._id) === String(hashtagId)) {
              hashtagList.push(comment);
            }
          });
        });

        expect(res.body.hashtag).to.eql(hashtagName);
        expect(Array.isArray(res.body.hashtagList)).to.be.true;
        expect(res.body.hashtagList.length).to.eql(hashtagList.length);

        done();
      });
  });

  it('Should not return hashtag list when a request comes for invalid hashtag ID', (done) => {
    request(app)
      .get('/api/hashtags/invalid')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(async (err, res) => {
        if (err) return done(err);
        
        expect(res.body.message).to.eql('해당 페이지를 찾을 수 없습니다.');

        done();
      });
  });
});
