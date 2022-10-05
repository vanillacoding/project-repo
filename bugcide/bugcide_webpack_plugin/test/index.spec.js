const BugcidePlugin = require('../dist/index');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

describe('Bugcide webpack plugin', () => {
  let mockToken;
  let MockBugcidePlugin;
  let mockFn;
  let mockCompiler;

  before(() => {
    mockToken = 'mock-token';
    MockBugcidePlugin = new BugcidePlugin({
      projectToken: mockToken
    });

    mockFn = sinon.spy();
    mockCompiler = {
      hooks: {
        emit: {
          tapAsync: mockFn
        }
      }
    };
  });

  describe('BugcidePlugin initialization', () => {
    it('calls compiler hooks tabAsync function after plugin initialization', () => {
      MockBugcidePlugin.apply(mockCompiler);

      expect(mockFn).to.have.been.calledWith('BugcidePlugin');
    });

    it('has project token in options property', () => {
      expect(MockBugcidePlugin.options.projectToken).to.equal(mockToken);
    });
  });

  describe('Bugcide Plugin compiler callback', () => {
    let mockCompilation = {};
    let mockSendApi;
    let mockError;

    before(() => {
      mockSendApi = sinon.stub(MockBugcidePlugin, 'sendErrorApi');
      mockSendApi.returns(Promise.resolve({ result: 'ok' }));
    });

    beforeEach(() => {
      mockError = [{
        error: {
          name: 'mockName',
          message: 'mockMessage',
          stack: 'mockStack',
          loc: {
            line: 10,
            col: 5
          }
        },
        module: {
          resource: 'mockResource'
        }
      }];

      mockCompilation.errors = mockError;
      mockCompiler = {
        hooks: {
          emit: {
            tapAsync: function (eventName, callback) {
              callback(mockCompilation, mockFn);
            }
          }
        }
      };
    });

    it('calls sendErrorApi if comilation.errors contains error object', () => {
      MockBugcidePlugin.apply(mockCompiler);

      expect(mockSendApi).to.have.been.calledWith(mockToken);
    });

    it('calls mockFn if compilation.errors is an empty array', () => {
      mockCompilation.errors = [];
      mockCompiler = {
        hooks: {
          emit: {
            tapAsync: function (eventName, callback) {
              callback(mockCompilation, mockFn);
            }
          }
        }
      };
      MockBugcidePlugin.apply(mockCompiler);

      expect(mockFn).to.have.been.calledWith();
      expect(mockSendApi).to.have.callCount(1);
    });
  });
});
