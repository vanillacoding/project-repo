const Track = require("../models/Track");
const Diary = require("../models/Diary");

exports.createTrackService = async ({
  title,
  artist,
  id,
  duration,
  date,
  genres,
  uri,
  albumImg,
  preview,
  energy,
}) => {
  try {
    const newTrack = await Track.create({
      title,
      artist,
      id,
      duration,
      date,
      genres,
      uri,
      albumImg,
      preview,
      energy,
    });

    return { newTrack };
  } catch (err) {
    return { createTrackServiceError: err };
  }
};

exports.pushTrackToDiaryPlaylistService = async (trackId, diary_id) => {
  try {
    const newDiaryPlaylist = await Diary.findByIdAndUpdate(
      diary_id,
      { $push: { playList: trackId } },
      { upsert: true, new: true }
    );

    return { newDiaryPlaylist };
  } catch (err){
    return { pushTrackToDiaryPlaylistServiceError: err };
  }
};
