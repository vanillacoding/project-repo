const SpotifyWebApi = require("spotify-web-api-node");
const { createTrackService, pushTrackToDiaryPlaylistService } = require("../../../services/trackService");

exports.serarchTrack = async (req, res, next) => {
  try {
    const accessToken = req.accessToken;
    const { user_id, diary_id } = req.params;
    const { keyword } = req.query;

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    const { body } = await spotifyApi.searchTracks(keyword, { limit: 10, offset: 1, country: "KR" });

    const nextTracks = body.tracks.next;
    const prevTracks = body.tracks.previous;

    const resultFormat = body.tracks.items.map(track => ({
      albumImg: track.album.images,
      artist: track.artists,
      duration: track.duration_ms,
      id: track.id,
      title: track.name,
      uri: track.uri,
      preview: track.preview_url,
      nextTracks,
    }));

    return res.json({ result: "ok", data: resultFormat });
  } catch (err) {
    next(err);
  }
};

exports.addNewTrackToDiaryPlaylist = async (req, res, next) => {
  try {
    const { trackInfo } = req.body;
    const { user_id, diary_id } = req.params;

    const { newTrack } = await createTrackService(trackInfo, user_id, diary_id );

    if (newTrack) {
      const { newDiaryPlaylist } = await pushTrackToDiaryPlaylistService(newTrack._id, diary_id);

      return res.json({ result: "ok", data: { newTrackInfo: newTrack } });
    }
  } catch (err) {
    next(err);
  }
};
