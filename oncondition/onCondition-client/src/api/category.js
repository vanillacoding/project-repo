import axios from "./axiosInstance";

function joinUrl(...args) {
  return args.join("/");
}

async function get(category, creatorId, page) {
  const res = await axios.get(joinUrl(creatorId, category), {
    headers: {
      page,
    },
  });

  if (res) {
    const { data, prevPage, nextPage } = res;

    return { data, prevPage, nextPage };
  }
}

async function post(category, creatorId, data) {
  const res = await axios.post(joinUrl(creatorId, category), data);

  if (res) {
    return res.data;
  }
}

async function getById(category, creatorId, ratingId) {
  const res = await axios.get(joinUrl(creatorId, category, ratingId));

  if (res) {
    return res.data;
  }
}

async function editById(category, creatorId, ratingId, data) {
  const res = await axios.patch(
    joinUrl(creatorId, category, ratingId),
    data,
  );

  return res;
}

async function deleteById(category, creatorId, ratingId) {
  const res = await axios.delete(joinUrl(creatorId, category, ratingId));

  return res;
}

async function postComment(category, creatorId, ratingId, data) {
  const res = await axios.post(
    joinUrl(creatorId, category, ratingId, "comment"),
    data,
  );

  if (res) {
    return res;
  }
}

async function editCommentById(category, creatorId, ratingId, commentId, data) {
  const res = await axios.patch(
    joinUrl(creatorId, category, ratingId, "comment", commentId),
    data,
  );

  if (res) {
    return res;
  }
}

async function deleteCommentById(category, creatorId, ratingId, commentId) {
  const res = await axios.delete(
    joinUrl(creatorId, category, ratingId, "comment", commentId),
  );

  if (res) {
    return res;
  }
}

function getApi(category) {
  return {
    get: get.bind(null, category),
    post: post.bind(null, category),
    getById: getById.bind(null, category),
    editById: editById.bind(null, category),
    deleteById: deleteById.bind(null, category),
    postComment: postComment.bind(null, category),
    editCommentById: editCommentById.bind(null, category),
    deleteCommentById: deleteCommentById.bind(null, category),
  };
}

export default getApi;
