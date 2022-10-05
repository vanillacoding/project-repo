import axios from "./axiosInstance";

async function getCondition(creatorId) {
  const res = await axios.get(`/${creatorId}`);

  if (res) {
    const { data, status } = res;

    return { data, status };
  }
}

export { getCondition };
