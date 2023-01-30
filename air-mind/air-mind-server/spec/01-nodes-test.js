const request = require('supertest');
const app = require('../app');

const requestApp = request.agent(app);

describe('01. Nodes test', () => {
  it('01-1. Get nodes data without query max', done => {
    requestApp
      .get('/users/123/mind-maps/456/nodes/634e4e47475c008330626937')
      .expect({
        result: 'ok',
        node: {
          '634e4e47475c008330626937': {
            attribute: {
              shape: 'roundSquare',
              size: 'large',
              cordX: 10,
              cordY: 10,
              color: 'black',
              isFold: false,
            },
            _id: '634e4e47475c008330626937',
            title: '1 번 노드',
            content: '가장 첫 시작점이 되는 노드입니다.',
            comments: ['421424212', '421424214'],
            children: [
              '634e4e47475c008330626938',
              '634e4e47475c008330626939',
              '634e4e47475c00833062693a',
            ],
            __v: 0,
          },
          '634e4e47475c008330626938': {
            attribute: {
              shape: 'roundSquare',
              size: 'medium',
              cordX: 20,
              cordY: 20,
              color: 'red',
              isFold: false,
            },
            _id: '634e4e47475c008330626938',
            title: '2 번 노드',
            content: '1 번 노드에 붙은 자식 노드이다.',
            comments: ['4214414213', '4214414215'],
            parent: '634e4e47475c008330626937',
            children: ['634e4e47475c00833062693b', '634e4e47475c00833062693c'],
            __v: 0,
          },
          '634e4e47475c008330626939': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 30,
              cordY: 20,
              color: 'yellow',
              isFold: false,
            },
            _id: '634e4e47475c008330626939',
            title: '3 번 노드',
            content:
              '1 번 노드에 붙은 자식 노드이다. 한 번 수정한다. 한 번 더 수정한다.',
            comments: [],
            parent: '634e4e47475c008330626937',
            children: [],
            __v: 0,
          },
          '634e4e47475c00833062693a': {
            attribute: {
              shape: 'roundSquare',
              size: 'medium',
              cordX: 60,
              cordY: 20,
              color: 'blue',
              isFold: false,
            },
            _id: '634e4e47475c00833062693a',
            title: '4 번 노드',
            content: '1 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c008330626937',
            children: ['634e4e47475c00833062693d', '634e4e47475c00833062693e'],
            __v: 0,
          },
          '634e4e47475c00833062693b': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 20,
              cordY: 50,
              color: 'green',
              isFold: false,
            },
            _id: '634e4e47475c00833062693b',
            title: '5 번 노드',
            content: '2 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c008330626938',
            children: [],
            __v: 0,
          },
          '634e4e47475c00833062693c': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 50,
              cordY: 50,
              color: 'yellogreen',
              isFold: false,
            },
            _id: '634e4e47475c00833062693c',
            title: '6 번 노드',
            content: '2 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c008330626938',
            children: [],
            __v: 0,
          },
          '634e4e47475c00833062693d': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 70,
              cordY: 50,
              color: 'yellogreen',
              isFold: false,
            },
            _id: '634e4e47475c00833062693d',
            title: '7 번 노드',
            content: '4 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c00833062693a',
            children: ['634e4e47475c00833062693f'],
            __v: 0,
          },
          '634e4e47475c00833062693e': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 90,
              cordY: 50,
              color: 'brown',
              isFold: false,
            },
            _id: '634e4e47475c00833062693e',
            title: '8 번 노드',
            content: '4 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c00833062693a',
            children: [],
            __v: 0,
          },
          '634e4e47475c00833062693f': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 40,
              cordY: 80,
              color: 'gray',
              isFold: false,
            },
            _id: '634e4e47475c00833062693f',
            title: '9 번 노드',
            content: '7 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c00833062693d',
            children: [],
            __v: 0,
          },
        },
        count: 9,
      })
      .end(err => {
        if (err) done(err);
        done();
      });
  });

  it('01-2. Get node data with query max', done => {
    requestApp
      .get('/users/123/mind-maps/456/nodes/634e4e47475c008330626937?max=5')
      .expect({
        result: 'ok',
        node: {
          '634e4e47475c008330626937': {
            attribute: {
              shape: 'roundSquare',
              size: 'large',
              cordX: 10,
              cordY: 10,
              color: 'black',
              isFold: false,
            },
            _id: '634e4e47475c008330626937',
            title: '1 번 노드',
            content: '가장 첫 시작점이 되는 노드입니다.',
            comments: ['421424212', '421424214'],
            children: [
              '634e4e47475c008330626938',
              '634e4e47475c008330626939',
              '634e4e47475c00833062693a',
            ],
            __v: 0,
          },
          '634e4e47475c008330626938': {
            attribute: {
              shape: 'roundSquare',
              size: 'medium',
              cordX: 20,
              cordY: 20,
              color: 'red',
              isFold: false,
            },
            _id: '634e4e47475c008330626938',
            title: '2 번 노드',
            content: '1 번 노드에 붙은 자식 노드이다.',
            comments: ['4214414213', '4214414215'],
            parent: '634e4e47475c008330626937',
            children: ['634e4e47475c00833062693b', '634e4e47475c00833062693c'],
            __v: 0,
          },
          '634e4e47475c008330626939': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 30,
              cordY: 20,
              color: 'yellow',
              isFold: false,
            },
            _id: '634e4e47475c008330626939',
            title: '3 번 노드',
            content:
              '1 번 노드에 붙은 자식 노드이다. 한 번 수정한다. 한 번 더 수정한다.',
            comments: [],
            parent: '634e4e47475c008330626937',
            children: [],
            __v: 0,
          },
          '634e4e47475c00833062693a': {
            attribute: {
              shape: 'roundSquare',
              size: 'medium',
              cordX: 60,
              cordY: 20,
              color: 'blue',
              isFold: false,
            },
            _id: '634e4e47475c00833062693a',
            title: '4 번 노드',
            content: '1 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c008330626937',
            children: ['634e4e47475c00833062693d', '634e4e47475c00833062693e'],
            __v: 0,
          },
          '634e4e47475c00833062693b': {
            attribute: {
              shape: 'roundSquare',
              size: 'small',
              cordX: 20,
              cordY: 50,
              color: 'green',
              isFold: false,
            },
            _id: '634e4e47475c00833062693b',
            title: '5 번 노드',
            content: '2 번 노드에 붙은 자식 노드이다.',
            comments: [],
            parent: '634e4e47475c008330626938',
            children: [],
            __v: 0,
          },
        },
        count: 5,
      })
      .end(err => {
        if (err) done(err);
        done();
      });
  });

  it('01-3. Put node data', done => {
    requestApp
      .put('/users/123/mind-maps/456/nodes/634e4e47475c008330626939')
      .send({
        attribute: {
          shape: 'roundSquare',
          size: 'small',
          cordX: 30,
          cordY: 20,
          color: 'yellow',
          isFold: false,
        },
        _id: '634e4e47475c008330626939',
        title: '3 번 노드',
        content: '1 번 노드에 붙은 자식 노드이다. 한 번 수정한다.',
        comments: [],
        parent: '634e4e47475c008330626937',
        children: [],
        __v: 0,
      })
      .expect({
        result: 'ok',
        node: {
          attribute: {
            shape: 'roundSquare',
            size: 'small',
            cordX: 30,
            cordY: 20,
            color: 'yellow',
            isFold: false,
          },
          _id: '634e4e47475c008330626939',
          title: '3 번 노드',
          content: '1 번 노드에 붙은 자식 노드이다. 한 번 수정한다.',
          comments: [],
          parent: '634e4e47475c008330626937',
          children: [],
          __v: 0,
        },
      })
      .end(err => {
        if (err) done(err);
        done();
      });
  });

  it('01-4. Put node data_2', done => {
    requestApp
      .put('/users/123/mind-maps/456/nodes/634e4e47475c008330626939')
      .send({
        attribute: {
          shape: 'roundSquare',
          size: 'small',
          cordX: 30,
          cordY: 20,
          color: 'yellow',
          isFold: false,
        },
        _id: '634e4e47475c008330626939',
        title: '3 번 노드',
        content:
          '1 번 노드에 붙은 자식 노드이다. 한 번 수정한다. 한 번 더 수정한다.',
        comments: [],
        parent: '634e4e47475c008330626937',
        children: [],
        __v: 0,
      })
      .expect({
        result: 'ok',
        node: {
          attribute: {
            shape: 'roundSquare',
            size: 'small',
            cordX: 30,
            cordY: 20,
            color: 'yellow',
            isFold: false,
          },
          _id: '634e4e47475c008330626939',
          title: '3 번 노드',
          content:
            '1 번 노드에 붙은 자식 노드이다. 한 번 수정한다. 한 번 더 수정한다.',
          comments: [],
          parent: '634e4e47475c008330626937',
          children: [],
          __v: 0,
        },
      })
      .end(err => {
        if (err) done(err);
        done();
      });
  });
});
