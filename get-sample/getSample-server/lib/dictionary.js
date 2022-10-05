require('dotenv').config();
const axios = require('axios');

module.exports = {
  requestToWordsAPI,
};

async function requestToWordsAPI(searchWord) {
  console.log('Running requestToWordsAPI');
  const wordsAPI = await axios.get(
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}`,
    {
      headers: {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.X_RAPID_APIKEY,
      },
    }
  );
  return wordsAPI;
}
