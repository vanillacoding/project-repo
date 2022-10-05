import axios from "../api/axiosInstance";

const BASE = "/api";

function joinUrl(...args) {
  return args.join("/");
}

async function getSleepData(creatorId) {
  const res = await axios.get(joinUrl(BASE, creatorId, "sleep"));

  if (res) {
    const { data, status } = res;

    return { data, status };
  }
}

async function getSleepDetail(creatorId, id) {
  const res = await axios.get(joinUrl(BASE, creatorId, "sleep", id));

  if (res) {
    return res;
  }
}

async function patchSleepDetail(creatorId, id) {
  const res = await axios.patch(joinUrl(BASE, creatorId, "sleep", id));

  if (res) {
    return res;
  }
}

async function deleteSleepDetail(creatorId, id) {
  const res = await axios.delete(joinUrl(BASE, creatorId, "sleep", id));

  if (res) {
    return res;
  }
}

export {
  getSleepData, getSleepDetail, patchSleepDetail, deleteSleepDetail,
};
