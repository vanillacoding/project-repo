const filterSameMusicOfUserToMusic = (musicLikedFromUser, musicFromServer) => {
  const map = new Map();

  musicLikedFromUser.forEach(music => map.set(music.musicId));

  return musicFromServer.filter(music => !map.has(music._id));
};

export default filterSameMusicOfUserToMusic;
