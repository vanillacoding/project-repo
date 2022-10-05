import Bugcide from '../dist/index';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('Bugcide npm package', () => {
  let mockToken;
  let MockBugcide;
  let mockEventFn;

  before(() => {
    mockToken = 'mock-token';
    MockBugcide = new Bugcide();

    mockEventFn = sinon.spy();

    global.window = {};
    global.window.addEventListener = mockEventFn;
    MockBugcide.init({ projectToken: mockToken });
  });

  describe('init method', () => {
    it('register window error eventlistener', () => {
      expect(mockEventFn).to.have.been.calledWith('error');
    });
  });

  describe('startTracking method', () => {
    let mockSendApi;
    let mockErrorEvent;
    before(() => {
      mockSendApi = sinon.stub(MockBugcide, 'sendErrorApi');
      mockSendApi.returns(Promise.resolve({ result: 'ok' }));
    });

    beforeEach(() => {
      mockErrorEvent = {
        error: {
          name: 'mockName',
          message: 'mockMessage',
          stack: 'mockMessage'
        },
        filename: 'mockFile',
        lineno: 10,
        colno: 5
      };
    });

    it('starts tracking if error occured', function (done) {
      this.timeout(3000);

      expect(MockBugcide.projectToken).to.equal(null);

      MockBugcide.startTracking(mockErrorEvent, mockToken);

      expect(MockBugcide.projectToken).to.equal(mockToken);
      expect(mockErrorEvent.error.hasBeenCaught).to.equal(true);

      expect(MockBugcide.errorQueue).to.have.length(1);
      expect(MockBugcide.errorCount).to.equal(1);
      expect(MockBugcide.errorQueue[0]).not.to.equal(mockErrorEvent);

      setTimeout(() => {
        expect(MockBugcide.errorCount).to.equal(1);
        expect(MockBugcide.errorQueue).to.have.length(0);
        expect(mockSendApi).to.have.been.calledWith(mockToken);
        done();
      }, 2000);
    });

    it('collects error and send them to server at once', function (done) {
      this.timeout(3000);

      MockBugcide.startTracking(mockErrorEvent, mockToken);
      mockErrorEvent.error.hasBeenCaught = undefined;

      MockBugcide.startTracking(mockErrorEvent, mockToken);
      mockErrorEvent.error.hasBeenCaught = undefined;

      MockBugcide.startTracking(mockErrorEvent, mockToken);
      mockErrorEvent.error.hasBeenCaught = undefined;

      expect(MockBugcide.errorQueue).to.have.length(3);

      setTimeout(() => {
        expect(MockBugcide.errorQueue).to.have.length(0);
        done();
      }, 2000);
    });
  });
});
