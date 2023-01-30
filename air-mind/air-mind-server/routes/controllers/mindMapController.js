const endOfMindMapListReq = async (req, res, next) => {
  if (!res.locals.mindMapsList) {
    const error = new Error(
      'No data delivered to endOfMindMapListReq in mindMapController.js',
    );
    error.status = 500;

    next(error);
  }

  const responseBody = {};

  responseBody.result = 'ok';
  responseBody.mindMap = res.locals.mindMapsList;
  responseBody.count = res.locals.mindMapsList.length;

  res.status(200).json(responseBody);
};

const endOfAllMindMapIdListReq = async (req, res, next) => {
  if (!res.locals.mindMapIdList) {
    const error = new Error(
      'No data delivered to endOfAllMindMapIdListReq in mindMapController.js',
    );
    error.status = 500;

    next(error);
  }

  const responseBody = {};

  responseBody.result = 'ok';
  responseBody.mindMapId = res.locals.mindMapIdList;
  responseBody.count = res.locals.mindMapIdList.length;

  res.status(200).json(responseBody);
};

const endOfMindMapReq = (req, res, next) => {
  if (!res.locals.mindMap) {
    const error = new Error(
      'No data delivered to endOfMindMapReq in mindMapController.js',
    );
    error.status = 500;

    next(error);
  }

  const responseBody = {
    result: 'ok',
    mindMap: res.locals.mindMap,
  };

  res.status(200).json(responseBody);
};

const endOfPostMindMapReq = (req, res, next) => {
  if (!res.locals.mindMap || !res.locals.childNode) {
    const error = new Error(
      'No data delivered to endOfPostMindMapReq in mindMapController.js',
    );
    error.status = 500;

    next(error);
  }

  const responseBody = {
    result: 'ok',
    mindMap: res.locals.mindMap,
    node: res.locals.childNode,
  };

  res.status(200).json(responseBody);
};

const endOfDeleteMindMapReq = (req, res) => {
  const response = { result: 'ok' };
  res.json(response);
};

const endOfMindMapAccessReq = (req, res, next) => {
  if (!res.locals.access || !res.locals.mindMap) {
    const error = new Error(
      'No data delivered to endOfMindMapAccessReq in mindMapController.js',
    );
    error.status = 500;

    next(error);
  }

  const response = {
    result: 'ok',
    access: res.locals.access,
  };

  if (res.locals.access === 'public' || req.user) {
    response.mindMap = res.locals.mindMap;
  }

  res.status(200).json(response);
};

module.exports = {
  endOfMindMapListReq,
  endOfAllMindMapIdListReq,
  endOfMindMapReq,
  endOfPostMindMapReq,
  endOfDeleteMindMapReq,
  endOfMindMapAccessReq,
};
