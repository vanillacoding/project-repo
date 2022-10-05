import filterSameMusicOfUserToUser from "./filterSameMusicOfUserToUser";

const filterMusicOfSimilarUser = (music, users) => {
  let result = [];

  users.forEach(user => {
    let filterdMusic = [];

    filterdMusic = filterSameMusicOfUserToUser(music, user[0]);

    result = result.concat(filterdMusic);
  });

  return result;
};

export default filterMusicOfSimilarUser;
