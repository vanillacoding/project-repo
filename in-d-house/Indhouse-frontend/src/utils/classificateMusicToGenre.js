const classificateMusicToGenre = (genres, musics) => {
  const genreMap = new Map();
  const genreNameMap = new Map();
  const totalMusic = musics.length;

  genres.forEach(genre => {
    genreMap.set(genre._id, 0);
    genreNameMap.set(genre._id, genre.name);
  });

  musics.forEach(music => {
    const prevCount = genreMap.get(music.genre);

    genreMap.set(music.genre, prevCount + 1);
  });

  const classificatedMusic = [...genreMap].map(genre => {
    const genreName = genreNameMap.get(genre[0]);
    const percentage = (genre[1] / totalMusic) * 100;

    return { genre: genreName, percentage };
  });

  classificatedMusic.sort((a, b) => b.percentage - a.percentage);

  return classificatedMusic;
};

export default classificateMusicToGenre;
