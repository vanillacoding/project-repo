import axios from 'axios';

const fetchPostDiary = async (userId, diary) => {
  try {
    const diaryResponse = await axios({
      method: 'post',
      url: `http://misleepdiary-env.eba-mu69qctx.ap-northeast-2.elasticbeanstalk.com/api/users/${userId}/diaries`,
      data: diary
    });
    const response = await diaryResponse.data;
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPostDiary;
