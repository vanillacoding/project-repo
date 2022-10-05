import { ERROR } from '../../constant/error';

export async function saveMaze(mazeData) {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(mazeData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/maze`,
      requestOptions,
    );
    const result = await response.text();

    return result;
  } catch (err) {
    console.error(err.message);

    throw new Error(ERROR.FAIL_TO_SAVE_MAZE);
  }
}

export async function getMaze(mazeId) {
  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/maze/${mazeId}`,
      requestOptions,
    );

    if (response.status >= 400) {
      throw new Error(ERROR.FAIL_TO_GET_MAZE);
    }

    const result = await response.text();

    return result;
  } catch (err) {
    console.error(err.message);

    throw new Error(`${err.message}, id: ${mazeId}`);
  }
}
