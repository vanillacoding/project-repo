import axios from 'axios';

export const requestBody = {
  startTimeMillis: null,
  endTimeMillis: null,
  aggregateBy: [
    {
      dataTypeName: 'com.google.activity.segment',
      dataSourceId: 'derived:com.google.activity.segment:com.google.fitkit:apple:iphone:hm.wristband:session_activity_segment'
    }
  ]
};

export const requestGoogleFitApi = async request => {
  try {
    return await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', request);
  } catch (error) {
    console.log(error);
    if (error.response.status === 400) {
      console.log('400!');
    }
  }
};
