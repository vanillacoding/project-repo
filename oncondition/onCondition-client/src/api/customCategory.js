import axios from "./axiosInstance";

async function addCustomCategory({ creatorId, category, categoryType }) {
  const res = await axios.post(`/${creatorId}/preference/`,
    { category, categoryType },
  );

  if (res) {
    return res.data;
  }
}

async function deleteCustomCategory({ creatorId, deletedCategory }) {
  const res = await axios.delete(`/${creatorId}/preference/${deletedCategory}`);

  if (res) {
    return res.data;
  }
}

export { addCustomCategory, deleteCustomCategory };
