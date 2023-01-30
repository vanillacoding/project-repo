const httpMocks = require("node-mocks-http");
const sampleProject = require("../__mocks__/sample_project.json");

const {
  getProjects,
  postProject,
} = require("../../controllers/user.controller");
const Project = require("../../models/Project");
const User = require("../../models/User");

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("GetProjects", () => {
  beforeEach(() => {
    Project.aggregate = jest.fn();
    User.exists = jest.fn();
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    Project.aggregate.mockClear();
    User.exists.mockClear();
  });

  it("Don't call User.exists when userId is not provided", async () => {
    req.params.userId = undefined;
    await getProjects(req, res, next);

    expect(next).toBeCalled();
    expect(User.exists).not.toBeCalled();
  });

  it("Don't call User.exists when userId is not valid object id", async () => {
    req.params.userId = "notAnObjectId";
    await getProjects(req, res, next);

    expect(next).toBeCalled();
    expect(User.exists).not.toBeCalled();
  });

  it("Don't call Project.aggregate when user can not be found", async () => {
    req.params.userId = "6355f48d6de65991d07789fe";
    await getProjects(req, res, next);

    expect(next).toBeCalled();
    expect(User.exists).toBeCalled();
    expect(Project.aggregate).not.toBeCalled();
  });

  it("Return json with null when Project.aggregate return null", async () => {
    req.params.userId = "6355f48d6de65991d07789fe";
    User.exists.mockReturnValue({ _id: "6355f48d6de65991d07789fe" });
    Project.aggregate.mockReturnValue(null);

    await getProjects(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ projects: null });
  });

  it("Return json with projects array when Project.aggregate return projects", async () => {
    const projects = [sampleProject, sampleProject, sampleProject];
    req.params.userId = "6355f48d6de65991d07789fe";
    User.exists.mockReturnValue({ _id: "6355f48d6de65991d07789fe" });
    Project.aggregate.mockReturnValue(projects);

    await getProjects(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ projects });
  });
});

describe("PostProject", () => {
  beforeEach(() => {
    User.findById = jest.fn();
    Project.create = jest.fn();
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    User.findById.mockClear();
    Project.create.mockClear();
  });

  it("Don't call User.findById when userId is not provided", async () => {
    req.params.userId = undefined;
    req.body.projectName = "sampleProject";

    await postProject(req, res, next);

    expect(next).toBeCalled();
    expect(User.findById).not.toBeCalled();
  });

  it("Don't call User.findById when userId is not valid object id", async () => {
    req.params.userId = "notAnObjectId";
    req.body.projectName = "sampleProject";

    await postProject(req, res, next);

    expect(next).toBeCalled();
    expect(User.findById).not.toBeCalled();
  });

  it("Don't call User.findById when projectName is undefined", async () => {
    req.params.userId = "6355f48d6de65991d07789fe";
    req.body.projectName = undefined;

    await postProject(req, res, next);

    expect(next).toBeCalled();
    expect(User.findById).not.toBeCalled();
  });

  it("Don't call User.findById when projectName.length > 50", async () => {
    req.params.userId = "6355f48d6de65991d07789fe";
    req.body.projectName = new Array(51).fill("a").join("");

    await postProject(req, res, next);

    expect(next).toBeCalled();
    expect(User.findById).not.toBeCalled();
  });

  it("Don't call Project.create when user is not found", async () => {
    req.params.userId = "6355f48d6de65991d07789fe";
    req.body.projectName = "sampleProject";
    User.findById.mockReturnValue(null);

    await postProject(req, res, next);

    expect(next).toBeCalled();
    expect(Project.create).not.toBeCalled();
  });

  it("Return json with project when Project.create is called", async () => {
    req.params.userId = "6355f48d6de65991d07789fe";
    req.body.projectName = "sampleProject";
    User.findById.mockReturnValue({ _id: req.params.userId });
    Project.create.mockReturnValue({
      creator: req.params.userId,
      name: req.body.projectName,
    });

    await postProject(req, res, next);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({
      result: "Success",
      project: {
        creator: req.params.userId,
        name: req.body.projectName,
      },
    });
  });
});
