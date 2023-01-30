jest.mock("google-auth-library");
const { OAuth2Client } = require("google-auth-library");

const verifyIdTokenMock = jest.fn();

OAuth2Client.mockImplementation(() => {
  return {
    verifyIdToken: verifyIdTokenMock,
  };
});

describe("Auth", () => {
  it("should be called verified token", async () => {
    const client = new OAuth2Client(process.env.EXPO_CLIENT_ID);

    client.verifyIdToken({
      idToken: "idtoken",
      audience: process.env.EXPO_CLIENT_ID,
    });

    expect(verifyIdTokenMock).toHaveBeenCalledWith({
      idToken: "idtoken",
    });
  });
});
