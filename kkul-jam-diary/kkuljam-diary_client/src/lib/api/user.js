import axios from 'axios';

export const fetchPostUser = async (profile, cb) => {
  const { email, name } = profile;
  try {
    const userResponse = await axios({
      method: 'post',
      url: 'http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/auth/login',
      data: { email, name }
    });
    const user = await userResponse.data;
    cb(user);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateUserInfo = async (userId, updateInfo) => {
  try {
    await axios({
      method: 'put',
      url: `http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/users/${userId}`,
      data: updateInfo
    });
  } catch (error) {
    console.log(error);
  }
};
