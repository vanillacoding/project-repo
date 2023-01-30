const endOfGetNodeReq = (req, res, next) => {
  if (!res.locals.nodesPlainObject) {
    const error = new Error(
      'No data delivered to endOfGetNodeReq in nodeController.js',
    );
    error.status = 500;

    next(error);
  }

  const responseBody = {};

  responseBody.result = 'ok';
  responseBody.node = res.locals.nodesPlainObject;
  responseBody.count = Object.keys(responseBody.node).length;

  res.status(200).json(responseBody);
};

const endOfPutNodeReq = (req, res, next) => {
  if (!res.locals.updatedNode) {
    const error = new Error(
      'No data delivered to endOfPutNodeReq in nodeController.js',
    );
    error.status = 500;

    next(error);
  }

  const responseBody = {};

  responseBody.result = 'ok';
  responseBody.node = res.locals.updatedNode;

  res.status(200).json(responseBody);
};

const endOfPostNodeReq = (req, res, next) => {
  if (!res.locals.childNode) {
    const error = new Error(
      'No data delivered to endOfPostNodeReq in nodeController.js',
    );
    error.status = 500;

    next(error);
  }
  const responseBody = {};

  responseBody.result = 'ok';
  responseBody.node = res.locals.childNode;

  res.status(201).json(responseBody);
};

const endOfDeleteNodeReq = (req, res) => {
  res.status(200).json({
    result: 'ok',
  });
};

module.exports = {
  endOfGetNodeReq,
  endOfPutNodeReq,
  endOfPostNodeReq,
  endOfDeleteNodeReq,
};
