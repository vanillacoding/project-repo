import axios from 'axios';

export const fetchPostSleep = async (userId, sleepList) => {
  try {
    const sleepResponse = await axios({
      method: 'post',
      url: `http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/users/${userId}/sleeps`,
      data: sleepList
    });
    const response = await sleepResponse.data;
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetAllSleep = async userId => {
  try {
    const sleepResponse = await axios({
      method: 'get',
      url: `http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/users/${userId}/sleeps`
    });
    const response = await sleepResponse.data;
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetSleep = async (userId, startDate, endDate, allowEmptyValue, cb) => {
  try {
    const sleepResponse = await axios({
      method: 'get',
      url: `http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/users/${userId}/sleeps?startDate=${startDate}&endDate=${endDate}&allowEmptyValue=${allowEmptyValue}`
    });
    const response = await sleepResponse.data;
    cb(response);
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetSleepById = async (userId, sleepId) => {
  try {
    const sleepResponse = await axios({
      method: 'get',
      url: `http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/users/${userId}/sleeps/${sleepId}`
    });
    const response = await sleepResponse.data;
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateSleepInfo = async (userId, sleepId, updateInfo) => {
  try {
    const response = await axios({
      method: 'put',
      url: `http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/users/${userId}/sleeps/${sleepId}`,
      data: updateInfo
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
