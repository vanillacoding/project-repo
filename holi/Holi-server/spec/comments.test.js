const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Comment = require('../models/Comment');

/* 
  Post Comment
*/

describe('POST /api/comments', function () {
  this.timeout(10000);

  const userData = {
    email: 'tony_bukpbmd_stark@tfbnw.net',
    picture_url: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&_nc_sid=f72489&_nc_ohc=OXNTz1yaVz8AX_FI6lR&_nc_ht=scontent-gmp1-1.xx&oh=c0ebac99f39064799ccf8924529d04da&oe=5EBB7738',
    name: 'Tony Stark'
  };
  let userId;
  let token;

  before((done) => {
    request(app)
      .post('/api/auth/login')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        userId = res.body.id;
        token = res.body.token;

        done();
      });
  });

  after(async () => {
    await Comment.findOneAndDelete({ contents: 'Test Comment' });
    userId = null;
    token = null;
  });

  it('If user enters comment, it should be saved', (done) => {
    const comment = {
      userId: userId,
      countryId: '1',
      contents: 'Test Comment',
      hashtags: [],
      created: '2020-04-14T15:36:10.258+00:00'
    };

    request(app)
      .post('/api/comments')
      .set({ authorization: `Bearer ${token}` })
      .send(comment)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);

        const { userId, contents, hashtags, created } = comment;
        const newComment = {
          author: userId,
          contents,
          hashtags,
          created,
          likes: []
        };

        await Comment.create(newComment);
        expect(res.body.result).to.eql('ok');

        done();
      });
  });

  it('Should not be possible to save a comment if token is not valid', (done) => {
    const comment = {
      userId: userId,
      countryId: '1',
      contents: 'Test Comment',
      hashtags: [],
      created: '2020-04-14T15:36:10.258+00:00'
    };

    request(app)
      .post('/api/comments')
      .set({ authorization: 'Bearer fake' })
      .send(comment)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body.message).to.eql('사용자 인증에 실패했습니다.');

        done();
      });
  });
});
