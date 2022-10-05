const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Chat = require('../models/Chat');

const mockData1 = {
  title: 'test',
  latitude: 37.1406529,
  longitude: 127.070742,
  chat_list: [
    {
      nickname: 'test nickname',
      message: 'message',
      created_at: '2019-04-14'
    },
    {
      nickname: 'test nickname2',
      message: 'message2',
      created_at: '2019-04-14'
    }
  ]
};

const mockData2 = {
  title: 'test2',
  latitude: 37.1406529,
  longitude: 127.070742,
  chat_list: [
    {
      nickname: 'test nickname',
      message: 'message',
      created_at: '2019-04-14'
    },
    {
      nickname: 'test nickname2',
      message: 'message2',
      created_at: '2019-04-14'
    }
  ]
};

describe('GET /api/chats', function () {
  this.timeout(10000);
  let mockChat;

  before(async () => {
    await new Chat(mockData1).save();

    mockChat = await Chat.findOne({ title: 'test' });
  });

  after(async () => {
    await Chat.findOneAndDelete({ _id: mockChat._id });
  });

  describe('/:id', () => {
    it('should respond with chat list', function (done) {
      request(app)
        .get(`/api/chats/${mockChat._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('test nickname');
          done();
        });
    });
  });
});

describe('POST /api/chats', function () {
  this.timeout(10000);
  let mockChat;

  beforeEach(async () => {
    await new Chat(mockData1).save();
    await new Chat(mockData2).save();

    mockChat = await Chat.findOne({ title: 'test' });
  });

  afterEach(async () => {
    await Chat.findOneAndDelete({ title: 'test' });
    await Chat.findOneAndDelete({ title: 'test2' });

    const test3 = await Chat.findOne({ title: 'test3' });

    if (test3) await Chat.findOneAndDelete({ title: 'test3' });
  });

  describe('/', () => {
    it('should respond with nearby chat', function (done) {
      request(app)
        .post('/api/chats/')
        .send({
          location: { latitude: mockData1.latitude, longitude: mockData1.longitude }
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('test2');
          done();
        });
    });
  });

  describe('/add', () => {
    it('should respond with nearby chat', function (done) {
      request(app)
        .post('/api/chats/add')
        .send({
          title: 'test3',
          location: { latitude: mockData1.latitude, longitude: mockData1.longitude }
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('test3');
          done();
        });
    });
  });

  describe('/:id/message/text', () => {
    it('should respond with message data', function (done) {
      request(app)
        .post(`/api/chats/${mockChat._id}/message/text`)
        .send({
          nickname: 'test nickname',
          message: 'test message'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('test nickname');
          expect(res.text).to.include('test message');
          done();
        });
    });
  });

  describe('/:id/message/image', () => {
    it('should respond with message data', function (done) {
      request(app)
        .post(`/api/chats/${mockChat._id}/message/image`)
        .field('nickname', 'test')
        .attach('photo', __dirname + '/test.jpeg')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include('imageUrl');
          done();
        });
    });
  });
});
