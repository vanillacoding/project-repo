import END_POINTS from "../constants/server";
import chromeIdentity from "../utils/chromeIdentity";
import chromeStore from "../utils/chromeStore";

const { USERS, LOGIN, SIGNUP, GLOSSARY, GLOSSARIES, TRANSLATIONS } = END_POINTS;

export const login = async (user) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(`${process.env.SERVER_URL}${USERS}${LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      email: user.email,
    }),
  });

  return response.json();
};

export const signup = async ({ email, name, glossary }, keywords) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(`${process.env.SERVER_URL}${USERS}${SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email, name, keywords, glossary }),
  });

  return response.json();
};

export const getGlossary = async ({ email }) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(
    `${process.env.SERVER_URL}${USERS}/${email}${GLOSSARY}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.json();
};

export const editGlossary = async ({ glossaryId, glossary }) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(
    `${process.env.SERVER_URL}${GLOSSARIES}/${glossaryId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ glossary }),
    },
  );

  return response.json();
};

export const addTranslations = async ({ email, translations }) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(`${process.env.SERVER_URL}${TRANSLATIONS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email, translations }),
  });

  return response.json();
};

export const synchronizeUserAndServer = async (userData) => {
  if (!userData) {
    throw new Error("유저 데이터가 없습니다.");
  }

  const gettingGlossaryResponse = await getGlossary(userData);

  if (gettingGlossaryResponse.result !== "ok") {
    throw gettingGlossaryResponse;
  }

  const mergedGlossary = {
    ...userData.glossary,
    ...gettingGlossaryResponse.data,
  };

  const newUserData = { ...userData, glossary: mergedGlossary };

  const editingGlossaryResponse = await editGlossary(newUserData);

  if (editingGlossaryResponse.result !== "ok") {
    throw new Error(editingGlossaryResponse.error.message);
  }

  await chromeStore.set("userData", newUserData);

  const addingTranslationResponse = await addTranslations(userData);

  if (addingTranslationResponse.result !== "ok") {
    throw new Error(addingTranslationResponse.error.message);
  }
};
