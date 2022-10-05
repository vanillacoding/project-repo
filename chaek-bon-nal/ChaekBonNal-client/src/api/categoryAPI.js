import api from './config';

const categoryAPI = async (category, user_id) => {
  const res = await api.put(`/users/${user_id}/category`, { category });

  return res.data.result;
};

export default categoryAPI
