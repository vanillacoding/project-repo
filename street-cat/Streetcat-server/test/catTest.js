const { expect } = require('chai');
const app = require('../app');
const request = require('supertest');
const User = require('../models/User');
const Cat = require('../models/Cat');
const jwt = require('jsonwebtoken');

const testUser = {
  facebookId: '106346727710982',
  name: 'test test',
};

const token = jwt.sign(
  { facebookId: testUser.facebookId, name: testUser.name }, 
  process.env.JWT_KEY, 
  { expiresIn: '3h' }
);

const addCatData = {
  'Content-Type': 'multipart/form-data',
  accessibility: '상', 
  description: '귀엽냥',
  friendliness: '상',
  id: '5e981ab11fd9c8081872ecf6',
  latitude : 300,
  longitude: 300,
  name: '발견했냥',
  time: '2011-05-01', 
};

const filepath = `${__dirname}/cat.jpg`;

describe('cat GET', function() {
  const login = '/auth/login';
  const cat = '/cat';
  const testUser = {
    facebookId : 'test',
    name : 'John Snow',
  };

  const fakeToken = 'WinterIsComing';

  before(function(done) {
    this.timeout(5000);
    request(app)
    .post(login)
    .send(testUser)
    .end((err, res) => {
      done();
    });
  });

  after(async () => {
    await User.findOneAndDelete({ name: testUser.name });
  });

  it ('Wrong token should give error result ', function(done) {
    request(app)
      .get(cat)
      .set('Authorization', `Bearer ${fakeToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).to.equal('error');
        done();
      });
  });

  it ('Valid token should give 200 status ', function(done) {
    request(app)
      .get(cat)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).to.equal('ok');
        done();
      });
  });
});

describe('cat POST', function() {
  after(async () => {
    await User.findByIdAndUpdate({ _id: addCatData.id }, { cats: [] });
  });
 
  it ('Should add a new cat', function(done) {
    this.timeout(4000)
    request(app)
      .post(`/cat`)
        .set('Authorization', `Bearer ${token}`)
        .field(addCatData)
        .attach('image', filepath, 'testImage')
        .expect(200)
        .end(async (err, res) => {
            const { result } = res.body;
            expect(result).to.equal('ok');
            const { cats } = await User.findById({ _id: addCatData.id }).populate('cats');
            expect(cats[0].name).to.equal('발견했냥');
            await Cat.findByIdAndDelete({ _id: cats[0]._id });
            done();
          });
        });
});

describe('/:cat_id PUT', function() {
  const newCat = {
    name: '테스트냥',
    accessibility: '상',
    friendliness: '상',
    description: '오늘뭐하냥',
    location: [37.506457, 127.058746],
  };

  let catId;

  before(function(done) {
    request(app)
    .post(`/cat`)
      .set('Authorization', `Bearer ${token}`)
      .field(addCatData)
      .attach('image', filepath, 'testImage')
      .expect(200)
      .end(async (err, res) => {
          const { cats } = await User.findById({ _id: addCatData.id }).populate('cats');
          catId = cats[0]._id;
          done();
        });
  });

  after(async() => {
    await Cat.findByIdAndDelete({ _id: catId });
    await User.findByIdAndUpdate({ _id: addCatData.id }, { cats: [] });
  });


  it ('Cat information should be modified ', function(done) {
    request(app)
      .put(`/cat/${catId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newCat)
      .expect(200)
      .end((err, res) => {
        const { cat, result } = res.body;
        expect(result).to.equal('ok');
        expect(cat.name).to.equal('테스트냥');
        expect(cat.accessibility).to.equal('상');
        expect(cat.friendliness).to.equal('상');
        expect(cat.description).to.equal('오늘뭐하냥');
        done();

      });
  });
});

describe('/:cat_id/comment GET', function() {
  const catId = '5e9596980170a80a58667a17';
  let commentLength;
  Cat.findById({ _id: catId }, (err, cat) => {
    commentLength = cat.comments.length
  });

  it ('Should get 200 status for response and get comment data ', function(done) {
    this.timeout(10000)
    request(app)
      .get(`/cat/${catId}/comment`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        const { result, comments} = res.body;
        expect(result).to.equal('ok');
        expect(comments.length).to.equal(commentLength);
        done();
      });
  });
});

describe('/:cat_id/comment DELETE', function() {
  const data = {
    catId: '5e9596980170a80a58667a17',
    commentId: '',
  }

  let commentLength;

  before(function(done) {
    this.timeout(2000);
    Cat.findById({ _id: data.catId }, (err, cat) => {
      commentLength = cat.comments.length;
      data.commentId = cat.comments[0];
      done();
    });
  });

  after(function(done) {
    const catId = '5e9596980170a80a58667a17';
    const data = {
      content: 'I wnana get this cat',
      id: catId,
      writerId: '5e958c690170a80a58667a16',
      writerName: 'test test',
    };

    request(app)
    .post(`/cat/${catId}/comment`)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
    .expect(200)
    .end((err, res) => {
      done();
    });
  });
  

  it ('Should get 200 status for response and delete a comment', function(done) {
    this.timeout(10000)
    request(app)
      .delete(`/cat/${data.catId}/comment/${data.commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        const { result, kitty } = res.body;
        expect(result).to.equal('ok');
        expect(kitty.comments.length).to.equal(commentLength - 1);
        done();
      });
  });
});

describe('/:cat_id/comment POST', function() {
  const catId = '5e9596980170a80a58667a17';
  const data = {
    content: 'I wnana get this cat',
    id: catId,
    writerId: '5e958c690170a80a58667a16',
    writerName: 'test test',
  };

  let commentLength;

  before(function(done) {
    this.timeout(2000);
    Cat.findById({ _id: catId }, (err, cat) => {
      commentLength = cat.comments.length;
      done();
    });
  });
  

  it ('Should get 200 status for response and add a comment', function(done) {
    this.timeout(10000)
    request(app)
      .post(`/cat/${catId}/comment`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        const { result, comment } = res.body;
        Cat.findById({ _id: catId }, (err, cat) => {
          expect(cat.comments.length).to.equal(commentLength + 1);
          expect(result).to.equal('ok');
          expect(comment.content).to.equal(data.content);
          expect(comment.writerId).to.equal(data.writerId);
          expect(comment.writerName).to.equal(data.writerName);
          done();
        });
      });
  });
});
