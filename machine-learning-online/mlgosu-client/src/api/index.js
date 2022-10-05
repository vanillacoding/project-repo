import axios from 'axios';

export const saveUser = async (id, name, email) => {
  await axios.post(
    'https://api.epoch.run/api/signin',
    {
      googleId: id,
      username: name,
      email: email
    }
  )
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
}

export const saveUrl = async (id, url, x, y) => {
  return await axios.post(
    'https://api.epoch.run/api/account/url',
    {
      googleId: id,
      google_drive_url: url,
      x: x,
      y: y
    }
  )
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log(error);
  });
}

export const getColumn = async (url) => {

  return await axios.post(
    'https://api.epoch.run/api/url',
    {
      google_drive_url: url
    }
  )
  .then(res => {

    return res.data;
  });
}
