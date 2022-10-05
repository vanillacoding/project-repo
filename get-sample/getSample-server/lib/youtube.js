const { getSubtitles } = require('youtube-captions-scraper');
const axios = require('axios');
const { GOOGLE_API_SCOPE } = require('../constants');
const {
  videoIdsbyChannelId,
  channelIdsByCategory,
} = require('../data/video');

const youtube = axios.create({
  baseURL: GOOGLE_API_SCOPE.YOUTUBE,
  params: {
    key: process.env.GOOGLE_APIKEY,
  },
});

module.exports = {
  getTenVideoSubtitlesFromLocalBy,
};

// get data from google
function getDataFromGoogleWebServer(word, categoryNamesfromClient) {
  //get channlIds []
  const channelIds = [];
  categoryNamesfromClient.forEach(name =>
    channelIds.push(...channelIdsByCategory[name]),
  );

  //get videoIds [] && getSubtitles
  async function getVideoIdsBy(channelId) {
    try {
      const channelInfo = await youtube.get('/search', {
        params: {
          part: 'snippet',
          order: 'date',
          maxResults: 25,
          channelId: channelId,
        },
      });
      let videoIds = channelInfo.data.items.map(
        info => info.id.videoId,
      );
      return videoIds;
    } catch (err) {
      console.log('cannot get videoIds by channelId');
    }
  }

  let totalVideoIds = [];
  Promise.all(
    channelIds.map(async id => {
      return await getVideoIdsBy(id);
    }),
  ).then(videoIds => {
    totalVideoIds.push(...videoIds),
      console.log('totalVideoIds:', totalVideoIds);

    // getSubtitles
    getSubtitlesBy(word, totalVideoIds, (lang = 'en'));
  });
}

//-----------------------------------------------------------------------------

// get data from Local
async function getTenVideoSubtitlesFromLocalBy(
  pageIndex,
  word,
  categoryNamesfromClient,
  language,
) {
  // console.log(pageIndex, word, categoryNamesfromClient);
  let totalVideoIds = [];

  // 카테고리에 해당하는 채널 아이디를 가져오고 채널 이름을 통해 -> 총 비디오 아이디 배열 만들기
  if (pageIndex === 0) {
    const channelIds = categoryNamesfromClient.reduce((acc, name) => {
      return acc.concat(channelIdsByCategory[name]);
    }, []);
    // console.log('channelIds', channelIds);
    channelIds.forEach(id => {
      let videoIds = videoIdsbyChannelId[id];
      totalVideoIds = totalVideoIds.concat(videoIds);
    });
  }
  // console.log('totalVideoIds', totalVideoIds);

  totalVideoSubtitles = await getSubtitlesBy(
    word,
    totalVideoIds,
    language,
  );

  // console.log('totalVideoSubtitles:', totalVideoSubtitles);
  const filtered = totalVideoSubtitles.videosInfo.filter(
    searchedResult => searchedResult.message !== 'No Searched Word',
  );
  // console.log('filtered.length', filtered.length);
  return filtered;
}

async function getSubtitlesBy(word, videoIds, lang = 'en') {
  try {
    let videosInfo = videoIds.map(async videoId => {
      let captions;

      try {
        captions = await getSubtitles({
          videoID: videoId, // youtube video id
          lang: lang, // default: `en`
        });
      } catch (err) {
        captions = [];
      }
      // finding searched word
      let startIndex = captions.findIndex(caption => {
        let LowerCaseText = caption.text.toLowerCase();
        return (
          LowerCaseText.indexOf(` ${word} `) !== -1 ||
          LowerCaseText.indexOf(` ${word}!`) !== -1 ||
          LowerCaseText.indexOf(` ${word},`) !== -1 ||
          LowerCaseText.indexOf(` ${word}.`) !== -1
        );
      });

      if (startIndex !== -1) {
        return {
          message: 'There is Searched Word',
          id: videoId,
          startIndex,
          captions,
        };
      } else {
        return {
          message: 'No Searched Word',
        };
      }
    });

    const videos = await Promise.all(videosInfo);

    console.log('!!!!getSubtitles: word, videos', word, videos);

    return {
      word,
      videosInfo: videos,
    };
  } catch (err) {
    throw new Error(err);
  }
}
