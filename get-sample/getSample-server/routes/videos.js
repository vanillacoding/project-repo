const express = require('express');
const router = express.Router();
const { getTenVideoSubtitlesFromLocalBy } = require('../lib/youtube');
const { CLIENT_URL } = require('../constants');

let word, videosInfo, pageIndex, categories, language;

router.post('/:searchDetails', async (req, res, next) => {
  console.log('REQUEST video-search', req.body.selected);
  console.log('URL:', req.params);
  console.log('CLIENT_URL', CLIENT_URL);

  if (!req.body.selected.pageIndex) {
    pageIndex = 0;
  } else {
    pageIndex = req.body.selected.pageIndex;
  }
  categories = req.body.selected.categories;
  language = req.body.selected.language;
  word = req.body.selected.word;
  try {
    videosInfo = await getTenVideoSubtitlesFromLocalBy(
      pageIndex,
      word,
      categories,
      language
    );
    if (videosInfo.length !== 0) {
      res.status(200).json({
        result: 'ok',
        searched: {
          word,
          videosInfo,
        },
      });
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
