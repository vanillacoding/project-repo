const mongoose = require("mongoose");
const Area = require("../models/Area");
const Post = require("../models/Post");

const jsonAreas = require("./Area.json");

const { imageNumbering, locationMocks, seasons, years } = require("./Post");

exports.saveAreas = function saveAreas() {
  console.log("area json data save db...");
  const promises = [];

  for (const area of jsonAreas.Area) {
    promises.push(Area.updateOne({ name: area.name }, area, { upsert: true }));
  }

  return Promise.all(promises);
};

exports.savePosts = function savePosts() {
  console.log("post data save db...");
  const promises = [];

  for (let number = 1; number <= imageNumbering; number++) {
    const postImageMock = `https://memona.s3.ap-northeast-2.amazonaws.com/test${number}.jpeg`;
    const locationIndex = Math.floor(Math.random() * locationMocks.length);
    const locationMock = locationMocks[locationIndex];
    const season = seasons[Math.floor(Math.random() * seasons.length)];
    const year = years[Math.floor(Math.random() * years.length)];

    const postMock = {
      author: mongoose.Types.ObjectId("60978fb4597e45176f27c9c1"),
      content: `테스트 목 데이터 입니다.\n${locationMock.name}\n${season}\n${year}`,
      postImageUrl: postImageMock,
      location: locationMock.location,
      area: locationMock.name,
      isAnonymous: true,
      season,
      year,
    };

    promises.push(Post.create(postMock));
  }

  return Promise.all(promises);
};
