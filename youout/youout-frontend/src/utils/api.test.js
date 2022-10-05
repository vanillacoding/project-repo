import api from './api';

const savedFetch = global.fetch;

const FAKE_PATH = '/fake';
const FAKE_DATA = 'fakeData';
const FAKE_TOKEN = 'fakeToken';
const FAKE_JSON = { data: FAKE_DATA };
const FAKE_BODY = { body: FAKE_DATA };

beforeEach(() => {
  global.fetch = jest.fn(() => (
    Promise.resolve({
      json: () => Promise.resolve(FAKE_JSON),
    })
  ));

  localStorage.setItem('token', FAKE_TOKEN);
});

afterEach(() => {
  global.fetch = savedFetch;

  localStorage.removeItem('token');
});

describe('api call test', () => {
  it('get method should call fetch with path', async () => {
    const result = await api.get({ path: FAKE_PATH });

    expect(result).toEqual(FAKE_DATA);
    expect(fetch.mock.calls[0][0]).toEqual(FAKE_PATH);
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);

    return;
  });

  it('post method should call fetch with path and body', async () => {
    const result = await api.post({ path: FAKE_PATH, body: FAKE_BODY });

    expect(result).toEqual(FAKE_DATA);
    expect(fetch.mock.calls[0][0]).toEqual(FAKE_PATH);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(FAKE_BODY));
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);

    return;
  });

  it('put method should call fetch with path and body', async () => {
    const result = await api.put({ path: FAKE_PATH, body: FAKE_BODY });

    expect(result).toEqual(FAKE_DATA);
    expect(fetch.mock.calls[0][0]).toEqual(FAKE_PATH);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(FAKE_BODY));
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);

    return;
  });

  it('delete method should call fetch with path and body', async () => {
    const result = await api.delete({ path: FAKE_PATH, body: FAKE_BODY });

    expect(result).toBeUndefined();
    expect(fetch.mock.calls[0][0]).toEqual(FAKE_PATH);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(FAKE_BODY));
    expect(fetch.mock.calls[0][1].headers.authorization).toEqual(FAKE_TOKEN);

    return;
  });
});
