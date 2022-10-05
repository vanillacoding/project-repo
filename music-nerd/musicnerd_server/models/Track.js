const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trackSchema = new Schema({
  spotify_track_id: {
    type: String,
    required: true,
    unique: true
  },
  title: [String],
  album_type: {
    type: String,
    required: true
  },
  thumbnail: {
    height: Number,
    url: String,
    width: Number,
  },
  release_date: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  audio_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Track', trackSchema);



// reference
// Track 정보 from https://developer.spotify.com/console/get-track/
// {
//   "album": {
//     "album_type": "single",
//     "artists": [
//       {
//         "external_urls": {
//           "spotify": "https://open.spotify.com/artist/0siBQaURCli5wn2lqv8WZg"
//         },
//         "href": "https://api.spotify.com/v1/artists/0siBQaURCli5wn2lqv8WZg",
//         "id": "0siBQaURCli5wn2lqv8WZg",
//         "name": "DPR LIVE",
//         "type": "artist",
//         "uri": "spotify:artist:0siBQaURCli5wn2lqv8WZg"
//       }
//     ],
//     "available_markets": [
//       "AD",
//       "AE",
//       "AR",
//       "AT",
//       "AU",
//       "BE",
//       "BG",
//       "BH",
//       "BO",
//       "BR",
//       "CA",
//       "CH",
//       "CL",
//       "CO",
//       "CR",
//       "CY",
//       "CZ",
//       "DE",
//       "DK",
//       "DO",
//       "DZ",
//       "EC",
//       "EE",
//       "EG",
//       "ES",
//       "FI",
//       "FR",
//       "GB",
//       "GR",
//       "GT",
//       "HN",
//       "HU",
//       "ID",
//       "IE",
//       "IL",
//       "IN",
//       "IS",
//       "IT",
//       "JO",
//       "JP",
//       "KW",
//       "LB",
//       "LI",
//       "LT",
//       "LU",
//       "LV",
//       "MA",
//       "MC",
//       "MT",
//       "MX",
//       "MY",
//       "NI",
//       "NL",
//       "NO",
//       "NZ",
//       "OM",
//       "PA",
//       "PE",
//       "PH",
//       "PL",
//       "PS",
//       "PT",
//       "PY",
//       "QA",
//       "RO",
//       "SA",
//       "SE",
//       "SG",
//       "SK",
//       "SV",
//       "TH",
//       "TN",
//       "TR",
//       "US",
//       "UY",
//       "VN",
//       "ZA"
//     ],
//     "external_urls": {
//       "spotify": "https://open.spotify.com/album/1XtTygUdUqtwPyErnZxLbR"
//     },
//     "href": "https://api.spotify.com/v1/albums/1XtTygUdUqtwPyErnZxLbR",
//     "id": "1XtTygUdUqtwPyErnZxLbR",
//     "images": [
//       {
//         "height": 640,
//         "url": "https://i.scdn.co/image/ab67616d0000b273262ee368886f6b290c338ef5",
//         "width": 640
//       },
//       {
//         "height": 300,
//         "url": "https://i.scdn.co/image/ab67616d00001e02262ee368886f6b290c338ef5",
//         "width": 300
//       },
//       {
//         "height": 64,
//         "url": "https://i.scdn.co/image/ab67616d00004851262ee368886f6b290c338ef5",
//         "width": 64
//       }
//     ],
//     "name": "Her",
//     "release_date": "2017-12-07",
//     "release_date_precision": "day",
//     "total_tracks": 5,
//     "type": "album",
//     "uri": "spotify:album:1XtTygUdUqtwPyErnZxLbR"
//   },
//   "artists": [
//     {
//       "external_urls": {
//         "spotify": "https://open.spotify.com/artist/0siBQaURCli5wn2lqv8WZg"
//       },
//       "href": "https://api.spotify.com/v1/artists/0siBQaURCli5wn2lqv8WZg",
//       "id": "0siBQaURCli5wn2lqv8WZg",
//       "name": "DPR LIVE",
//       "type": "artist",
//       "uri": "spotify:artist:0siBQaURCli5wn2lqv8WZg"
//     }
//   ],
//   "available_markets": [
//     "AD",
//     "AE",
//     "AR",
//     "AT",
//     "AU",
//     "BE",
//     "BG",
//     "BH",
//     "BO",
//     "BR",
//     "CA",
//     "CH",
//     "CL",
//     "CO",
//     "CR",
//     "CY",
//     "CZ",
//     "DE",
//     "DK",
//     "DO",
//     "DZ",
//     "EC",
//     "EE",
//     "EG",
//     "ES",
//     "FI",
//     "FR",
//     "GB",
//     "GR",
//     "GT",
//     "HN",
//     "HU",
//     "ID",
//     "IE",
//     "IL",
//     "IN",
//     "IS",
//     "IT",
//     "JO",
//     "JP",
//     "KW",
//     "LB",
//     "LI",
//     "LT",
//     "LU",
//     "LV",
//     "MA",
//     "MC",
//     "MT",
//     "MX",
//     "MY",
//     "NI",
//     "NL",
//     "NO",
//     "NZ",
//     "OM",
//     "PA",
//     "PE",
//     "PH",
//     "PL",
//     "PS",
//     "PT",
//     "PY",
//     "QA",
//     "RO",
//     "SA",
//     "SE",
//     "SG",
//     "SK",
//     "SV",
//     "TH",
//     "TN",
//     "TR",
//     "US",
//     "UY",
//     "VN",
//     "ZA"
//   ],
//   "disc_number": 1,
//   "duration_ms": 177342,
//   "explicit": false,
//   "external_ids": {
//     "isrc": "KRA381702794"
//   },
//   "external_urls": {
//     "spotify": "https://open.spotify.com/track/1dN4Z7wZTQXLEl33RkMO3a"
//   },
//   "href": "https://api.spotify.com/v1/tracks/1dN4Z7wZTQXLEl33RkMO3a",
//   "id": "1dN4Z7wZTQXLEl33RkMO3a",
//   "is_local": false,
//   "name": "Text Me",
//   "popularity": 60,
//   "preview_url": "https://p.scdn.co/mp3-preview/6a205b7e76081bef3f9f27dec51817e6bf16c157?cid=774b29d4f13844c495f206cafdad9c86",
//   "track_number": 3,
//   "type": "track",
//   "uri": "spotify:track:1dN4Z7wZTQXLEl33RkMO3a"
// }