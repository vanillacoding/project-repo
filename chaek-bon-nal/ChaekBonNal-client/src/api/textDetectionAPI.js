const axios = require('axios').default;

const textDetectionAPI = async (base64encoding) => {
  const imageUrl = base64encoding.split(',')[1];
  try {
    const response = await axios.post(process.env.REACT_APP_GOOGLE_VISION_API, {
      requests: [
        {
          image: { content: imageUrl },
          features: [ { type: 'TEXT_DETECTION' } ]
        }
      ]
    });

    return response.data.responses[0].fullTextAnnotation.text;
  } catch (error) {
    console.log('google vision error ', error)
    alert('텍스트를 감지할 수 없는 이미지입니다.')
  }
};

export default textDetectionAPI
