const User = require('../models/User');
const Game = require('../models/Game');
const Artist = require('../models/Artist');
const Track = require('../models/Track');

const storage = {};

module.exports = io => {
  io.on('connect', socket => {
    console.log('socket connected');

    let currentUser, currentGame;

    socket.on('join room', async clientData => {
      const { userId, gameId } = clientData;
      socket.join(gameId);

      if (!storage[gameId]) {
        storage[gameId] = {
          gameHost: '',
          players: [],
          readyStatus: {},
          score: {},
          answerLog: {},
          trackList: [],
          currentTrack: '',
        };
      }

      try {
        currentUser = await User.findById(userId);
        const { username, thumbnail_url, favorite_artists } = currentUser;

        currentGame = await Game.findByIdAndUpdate(
          gameId,
          { $push: { players: { userId, username, thumbnail_url, favorite_artists } } },
          { new: true }
        );

        storage[gameId].players = [
          ...storage[gameId].players,
          { userId, username, thumbnail_url, favorite_artists }
        ];

        io.to(currentGame._id).emit(
          'players and readyStatus',
          storage[gameId].players,
          storage[gameId].readyStatus
        );
      } catch (err) {
        console.error('get current user and game error', err);
      }
    });

    socket.on('request game host', async gameId => {
      try {
        const { created_by: gameHost } = await Game.findById(gameId);

        storage[gameId].gameHost = gameHost;

        io.to(gameId).emit('gameHost', gameHost);
      } catch (err) {
        console.error('request game host error', err);
        res.status(500).json({
          errorMessage: 'Server error. Please try again.'
        });
      }
    });

    socket.on('leave room', async clientData => {
      const { userId, gameId } = clientData;
      socket.leave(gameId);

      try {
        const currentGame = await Game.findByIdAndUpdate(
          gameId,
          { $pull: { players: { userId } }},
          { new: true }
        );

        if (!currentGame.players.length) {
          await Game.deleteOne({ _id: gameId });
        }

        const updatedPlayers = storage[gameId].players.filter(player => {
          return player.userId !== userId
        });
        storage[gameId].players = updatedPlayers;
        delete storage[gameId].readyStatus[userId];

        console.log('User has left room.');

        io.to(gameId).emit(
          'players and readyStatus',
          storage[gameId].players,
          storage[gameId].readyStatus
        );
      } catch (err) {
        console.error('socket leave room error', err);
        res.status(500).json({
          errorMessage: 'Server error. Please try again.'
        });
      }
    });

    socket.on('on ready', userId => {
      const gameId = currentGame._id;
      storage[gameId].readyStatus = { ...storage[gameId].readyStatus, [userId]: true };

      io.to(gameId).emit('ready status', storage[gameId].readyStatus);
    });

    socket.on('off ready', userId => {
      const gameId = currentGame._id;
      delete storage[gameId].readyStatus[userId];

      io.to(gameId).emit('ready status', storage[gameId].readyStatus);
    });

    socket.on('request game start', async players => {
      const gameId = currentGame._id;
      await currentGame.updateOne({ is_playing: true });

      const commonArtists = {};
      players.forEach(player => {
        const { favorite_artists: favoriteArtists } = player;

        favoriteArtists.forEach(artist => {
          if (!commonArtists[artist]) {
            commonArtists[artist] = true;
          }
        });
      });

      let allTracks = [];
      for (const artistId in commonArtists) {
        const artist = await Artist.findById(artistId);
        allTracks = allTracks.concat(artist.tracks);
      }

      while (storage[gameId].trackList.length < 10) {
        const randomNumber = Math.floor(Math.random() * allTracks.length);
        const randomTrackId = allTracks[randomNumber];
        const trackInfo = await Track.findById(randomTrackId).populate('artist');

        storage[gameId].trackList.push(trackInfo);
        allTracks.splice(randomNumber, 1);
      }

      socket.emit('ready to start');
    });

    socket.on('request new track', async () => {
      const { _id: gameId } = currentGame;
      const { _id: userId, username } = currentUser;
      storage[gameId].currentTrack = storage[gameId].trackList[storage[gameId].trackList.length - 1];
      storage[gameId].trackList.pop();

      if (storage[gameId].currentTrack) {
        console.log(storage[gameId].currentTrack.title);
        return io.to(gameId).emit('send a track', storage[gameId].currentTrack);
      }

      const finalScore = storage[gameId].score;
      try {
        await User.findByIdAndUpdate(
          userId,
          { $push: { play_log: { played_at: Date.now(), scored: finalScore[username] } } },
          { new: true }
        );
      } catch (err) {
        console.error('save play log err', err);
      }
      io.to(gameId).emit('end game');
    });

    socket.on('send message', message => {
      const gameId = currentGame._id;
      const { currentTrack } = storage[gameId];

      if (!currentTrack || storage[gameId].answerLog[currentTrack]) {
        io.to(gameId).emit('chat messages', { username: currentUser.username, message });
      } else {
        const { title: titleAnswerList, artist: { names: artistAnswerList } } = storage[gameId].currentTrack;

        let doesMatchArtist, doesMatchTitle = false;

        for (let artist of artistAnswerList) {
          artist = artist.replace(/ /g, '').toLowerCase();
          if (message.replace(/ /g, '').toLowerCase().includes(artist)) {
            doesMatchArtist = true;
            break;
          }
        }

        for (let title of titleAnswerList) {
          title = title.replace(/ /g, '').toLowerCase();
          if (message.replace(/ /g, '').toLowerCase().includes(title)) {
            doesMatchTitle = true;
            break;
          }
        }

        if (doesMatchArtist && doesMatchTitle) {
          storage[gameId].answerLog[currentTrack] = true;

          const userScore = storage[gameId].score[currentUser.username];
          const updatedScore = userScore ? userScore + 10 : 10;

          storage[gameId].score = {
            ...storage[gameId].score,
            [currentUser.username]: updatedScore
          };

          io.to(gameId).emit('correct answer', { username: currentUser.username, message });
        } else {
          io.to(gameId).emit('chat messages', { username: currentUser.username, message });
        }
      }
    });

    socket.on('save favorite track', async trackId => {
      const { _id: userId } = currentUser;
      try {
        await User.findByIdAndUpdate(
          userId,
          { $addToSet: { favorite_tracks: trackId } },
          { new: true }
        );
      } catch (err) {
        console.error('save favorite track error', err)
      }
    });

    socket.on('delete favorite track', async trackId => {
      const { _id: userId } = currentUser;
      try {
        await User.findByIdAndUpdate(
          userId,
          { $pull: { favorite_tracks: trackId } },
          { new: true }
        );
      } catch (err) {
        console.error('delete favorite track error', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  });
};
