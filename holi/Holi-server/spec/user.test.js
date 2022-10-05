const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Country = require('../models/Country');
const Comment = require('../models/Comment');

/* 
  Get User Comments / Likes
*/

describe('GET /api/users/:user_id', function () {
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
    userId = null;
    token = null;
  });

  it('Should respond with list of user-created comments', (done) => {
    request(app)
      .get('/api/users/5e95dbca2f25182fa71fff80/comments')
      .set({ authorization: `Bearer ${token}` })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const comments = await Comment.find()
          .populate('hashtags')
          .populate('author');
        const commentList = comments.filter((comment) => {
          return String(comment.author._id) === userId;
        });

        expect(res.body.commentList.length).to.eql(commentList.length);

        done();
      });
  });

  it('Should respond with list of like countries', (done) => {
    request(app)
      .get('/api/users/5e95dbca2f25182fa71fff80/likes')
      .set({ authorization: `Bearer ${token}` })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const countries = await Country.find();
        const likeList = countries.filter((country) => {
          return country.likes.includes(userId);
        });

        expect(res.body.likeList.length).to.eql(likeList.length);
        expect(Array.isArray(res.body.likeList)).to.be.true;

        done();
      });
  });
});
