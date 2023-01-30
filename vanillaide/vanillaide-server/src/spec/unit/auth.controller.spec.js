const httpMocks = require("node-mocks-http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { postSignUp, postLogIn } = require("../../controllers/auth.controller");
const sampleUser = require("../__mocks__/sample_user.json");
const User = require("../../models/User");

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("postSignUp", () => {
  beforeEach(() => {
    User.findOne = jest.fn();
    User.create = jest.fn();
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    User.findOne.mockClear();
    User.create.mockClear();
  });

  it("Should not call User.findOne when req.body.username is not provided", async () => {
    req.body = {
      username: undefined,
      email: "abc@gmail.com",
      password: "icecream123",
      passwordConfirm: "icecream123",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.findOne when req.body.username is not valid username", async () => {
    req.body = {
      username: "ㅓ",
      email: "bread@gmail.com",
      password: "breakfast123",
      passwordConfirm: "breakfast123",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.findOne when req.body.email is not provided", async () => {
    req.body = {
      username: "Sally",
      email: undefined,
      password: "oioi12345",
      passwordConfirm: "oioi12345",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.findOne when email is not valid email", async () => {
    req.body = {
      username: "Danny",
      email: "aaa.uio",
      password: "helloworld123",
      passwordConfirm: "helloworld123",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.findOne when password is not provided", async () => {
    req.body = {
      username: "Catherine",
      email: "havefun@gmail.com",
      password: undefined,
      passwordConfirm: "goodnight123",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.findOne when password is not valid password", async () => {
    req.body = {
      username: "Shawn",
      email: "greener@gmail.com",
      password: "a2",
      passwordConfirm: "a2",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.findOne when passwordConfirm is not provided", async () => {
    req.body = {
      username: "Hailey",
      email: "hailey13@gmail.com",
      password: "bluesky789",
      passwordConfirm: undefined,
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should call User.findOne when passwordConfirm is not valid passwordConfirm", async () => {
    req.body = {
      username: "Sunny",
      email: "sunnyday@gmail.com",
      password: "shinyday123",
      password: "shi",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.findOne when passwordConfirm do not match password", async () => {
    req.body = {
      username: "Emily",
      email: "emily@gmail.com",
      password: "bcde012345",
      passwordConfirm: "abcde12345",
    };

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.findOne).not.toBeCalled();
  });

  it("Should not call User.create when registered user exists with req.body.email", async () => {
    req.body = {
      username: "JohnDarick",
      email: "john@gmail.com",
      password: "cdefg789",
      passwordConfirm: "cdefg789",
    };

    User.findOne.mockReturnValue(sampleUser);

    await postSignUp(req, res, next);

    expect(next).toBeCalled();
    expect(User.create).not.toBeCalled();
  });

  it("Should call User.create when registered user does not exists with req.body.email", async () => {
    req.body = {
      username: "JennyKim",
      email: "luckyday@gmail.com",
      password: "happyday123",
      passwordConfirm: "happyday123",
    };

    User.findOne.mockReturnValue(null);

    await postSignUp(req, res, next);

    expect(User.create).toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ result: "Success" });
  });
});

describe("postLogIn", () => {
  beforeEach(() => {
    User.findOne = jest.fn();
    bcrypt.compare = jest.fn();
    jwt.sign = jest.fn();
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      setHeader: jest.fn(() => res),
    };
  });

  afterEach(() => {
    User.findOne.mockClear();
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();
  });

  it("Should not call bcrypt.compare when user does not exist", async () => {
    req.headers = {
      email: "nouser@gmail.com",
      password: "notexist123",
    };

    User.findOne = jest.fn().mockImplementationOnce(() => ({
      lean: jest.fn().mockReturnValue(null),
    }));

    await postLogIn(req, res, next);

    expect(next).toBeCalled();
    expect(bcrypt.compare).not.toBeCalled();
  });

  it("Should response with status 200 and result success", async () => {
    req.headers = {
      email: "john@gmail.com",
      password: "abcde12345",
    };

    User.findOne = jest.fn().mockImplementationOnce(() => ({
      lean: jest.fn().mockReturnValue(sampleUser),
    }));

    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockReturnValue("token");

    await postLogIn(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ result: "Success", user: sampleUser });
  });
});
