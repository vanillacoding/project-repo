import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const fetchRepoData = async (repoUrl) => {
  const res = await axiosInstance.get(`/repository?repoUrl=${repoUrl.trim()}`);

  return res.data;
};

export const fetchDiff = async (repoUrl, commitHash) => {
  const res = await axiosInstance.get(
    `/repository/diff?repoUrl=${repoUrl}&commitHash=${commitHash}`,
  );

  return res.data;
};
