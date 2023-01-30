const httpMocks = require("node-mocks-http");
const sampleProject = require("../__mocks__/sample_project.json");

const {
  patchProject,
  deleteProject,
  postDeployment,
  getDeployment,
} = require("../../controllers/project.controller");
const Project = require("../../models/Project");

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("PatchProject", () => {
  beforeEach(() => {
    Project.findById = jest.fn();
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    Project.findById.mockClear();
  });

  it("Don't call Project.findById when projectId is not provided", async () => {
    req.params.projectId = undefined;
    await patchProject(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findById).not.toBeCalled();
  });

  it("Don't call Project.findById when projectId is not valid object id", async () => {
    req.params.projectId = "1234abcd";

    await patchProject(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findById).not.toBeCalled();
  });

  it("Don't return json data when project can not be found", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";
    Project.findById.mockReturnValue(null);

    await patchProject(req, res, next);

    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
  });

  it("Return success result but don't call project.save when code in database is same with req.body.code", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";
    req.body.code = {
      html: "sample html",
      css: "sample css",
      js: "sample js",
    };

    const mockProject = { ...sampleProject, save: jest.fn() };
    Project.findById.mockReturnValue(mockProject);

    await patchProject(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ result: "Success" });
    expect(mockProject.save).not.toBeCalled();
  });

  it("Return success result and call project.save when code in database is not same with req.body.code", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";
    req.body.code = {
      html: "changed html",
      css: "changed css",
      js: "changed js",
    };

    const mockProject = { ...sampleProject, save: jest.fn() };
    Project.findById.mockReturnValue(mockProject);

    await patchProject(req, res, next);

    expect(mockProject.save).toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ result: "Success" });
  });
});

describe("DeleteProject", () => {
  beforeEach(() => {
    Project.findByIdAndDelete = jest.fn();
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    Project.findByIdAndDelete.mockClear();
  });

  it("Don't call Project.findByIdAndDelete when the projectId is not provided", async () => {
    req.params.projectId = undefined;

    await deleteProject(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findByIdAndDelete).not.toBeCalled();
  });

  it("Don't call Project.findByIdAndDelete when the projectId is not valid object id", async () => {
    req.params.projectId = "1234abcd";

    await deleteProject(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findByIdAndDelete).not.toBeCalled();
  });

  it("Should call Project.findByIdAndDelete and return success result when projectId is valid", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";

    await deleteProject(req, res, next);

    expect(Project.findByIdAndDelete).toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ result: "Success" });
  });
});

describe("PostDeployment", () => {
  beforeEach(() => {
    Project.findById = jest.fn();
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    Project.findById.mockClear();
  });

  it("Don't call Project.findById when projectId is not provided", async () => {
    req.params.projectId = undefined;

    await postDeployment(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findById).not.toBeCalled();
  });

  it("Don't call Project.findById when projectId is not valid object id", async () => {
    req.params.projectId = "1234abcd";

    await postDeployment(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findById).not.toBeCalled();
  });

  it("Don't return json data when project can not be found", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";
    Project.findById.mockReturnValue(null);

    await postDeployment(req, res, next);

    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
  });

  it("Call project.save and return json data when project can be found", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";
    const mockProject = { ...sampleProject, save: jest.fn() };
    Project.findById.mockReturnValue(mockProject);

    await postDeployment(req, res, next);

    expect(mockProject.save).toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      result: "Success",
      deployLink: "undefined/api/projects/6355f48d6de65991d07789fe/deployment",
    });
  });
});

describe("GetDeployment", () => {
  beforeEach(() => {
    Project.findById = jest
      .fn()
      .mockImplementationOnce(() => ({ lean: jest.fn() }));
    res = {
      render: jest.fn(),
    };
  });

  afterEach(() => {
    Project.findById.mockClear();
  });

  it("Don't call Project.findById when projectId is not provided", async () => {
    req.params.projectId = undefined;

    await getDeployment(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findById).not.toBeCalled();
  });

  it("Don't call Project.findById when projectId is not valid object id", async () => {
    req.params.projectId = "1234abcd";
    await getDeployment(req, res, next);

    expect(next).toBeCalled();
    expect(Project.findById).not.toBeCalled();
  });

  it("Should not render deployed page when project can not be found", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";
    Project.findById = jest.fn().mockImplementationOnce(() => ({
      lean: jest.fn().mockReturnValue(null),
    }));

    await getDeployment(req, res, next);

    expect(next).toBeCalled();
    expect(res.render).not.toBeCalled();
  });

  it("Should not render deployed page when deploy link doesn't exist", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";

    Project.findById = jest.fn().mockImplementationOnce(() => ({
      lean: jest.fn().mockReturnValue(sampleProject),
    }));

    await getDeployment(req, res, next);

    expect(next).toBeCalled();
    expect(res.render).not.toBeCalled();
  });

  it("Should render deployed page when deploy link exists", async () => {
    req.params.projectId = "6355f48d6de65991d07789fe";
    sampleProject.deployLink =
      "undefined/api/projects/6355f48d6de65991d07789fe/deployment";

    Project.findById = jest.fn().mockImplementationOnce(() => ({
      lean: jest.fn().mockReturnValue(sampleProject),
    }));

    await getDeployment(req, res, next);

    expect(res.render).toBeCalled();
  });
});
