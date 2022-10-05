const filterSameMusicOfUserToUser = (musicLikedFromUser, users) => {
  const map = new Map();

  musicLikedFromUser.forEach(music => map.set(music.musicId));

  return users.likeMusic.filter(music => !map.has(music.musicId));
};

export default filterSameMusicOfUserToUser;
