const request = require('supertest');
const app = require('../app');

const requestApp = request.agent(app);

describe('02. Mind maps test', () => {
  it('02-1. Get specific users mind map list with queries max 10, access public&private', done => {
    requestApp
      .get('/users/634ed0452b20f15c36b9a028/mind-maps?max=10&access=mixed')
      .expect({
        result: 'ok',
        mindmaps: [
          {
            _id: '634eae390878d6b9212b8128',
            title: 'Number 1 document',
            author: '634ed0452b20f15c36b9a028',
            access: 'public',
            headNode: '634e4e47475c008330626937',
          },
          {
            _id: '634eaeef0878d6b9212b812c',
            title: 'Number 3 document',
            author: '634ed0452b20f15c36b9a028',
            access: 'private',
            headNode: '634e4e47475c00833062693b',
          },
          {
            _id: '634eaf0f0878d6b9212b812e',
            title: 'Number 5 document',
            author: '634ed0452b20f15c36b9a028',
            access: 'private',
            headNode: '634e4e47475c008330626938',
          },
          {
            _id: '634eaf310878d6b9212b8130',
            title: 'Number 7 document',
            author: '634ed0452b20f15c36b9a028',
            access: 'public',
            headNode: '634e4e47475c008330626939',
          },
        ],
        count: 4,
      })
      .end(err => {
        if (err) done(err);
        done();
      });
  });

  it('02-2. Get specific users mind map list with queries max 3, access public', done => {
    requestApp
      .get('/users/634ed0452b20f15c36b9a028/mind-maps?max=3&access=public')
      .expect({
        result: 'ok',
        mindmaps: [
          {
            _id: '634eae390878d6b9212b8128',
            title: 'Number 1 document',
            author: '634ed0452b20f15c36b9a028',
            access: 'public',
            headNode: '634e4e47475c008330626937',
          },
          {
            _id: '634eaf310878d6b9212b8130',
            title: 'Number 7 document',
            author: '634ed0452b20f15c36b9a028',
            access: 'public',
            headNode: '634e4e47475c008330626939',
          },
        ],
        count: 2,
      })
      .end(err => {
        if (err) done(err);
        done();
      });
  });
});
