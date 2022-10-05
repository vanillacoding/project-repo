import { nanoid } from "nanoid";
import END_POINTS from "../constants/server";
import chromeIdentity from "../utils/chromeIdentity";
import chromeStore from "../utils/chromeStore";

const { WORDS, TRANSLATED, TRANSLATIONS } = END_POINTS;

const DECIMAL_POINT = 2;
const PERCENTAGE = 100;
const SIMILARITY = 95;

export const deleteTranslations = async (translationId) => {
  const accessToken = await chromeIdentity.getAccessToken();

  const response = await fetch(
    `${process.env.SERVER_URL}/translations/${translationId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.json();
};

export const getTranslations = async (email, params) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(
    `${process.env.SERVER_URL}/translations/${email}?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  if (data.result === "error") {
    throw data;
  }

  return data.data;
};

export const sendTranslations = async (email, translations) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(`${process.env.SERVER_URL}/translations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      email,
      translations,
    }),
  });

  const data = await response.json();

  if (data.result === "error") {
    throw data;
  }
};

export const createTranslationParam = (page, limit) => {
  const params = {
    page,
    limit,
  };

  return new URLSearchParams(params).toString();
};

export const combineTranslations = (
  storageTranslations,
  serverTranslations,
) => {
  const combinedTranslations = storageTranslations;
  const uniqueNanoIds = new Set();

  combinedTranslations.forEach((combinedTranslation) => {
    uniqueNanoIds.add(combinedTranslation.nanoId);
  });

  serverTranslations.forEach((storageTranslation) => {
    if (!uniqueNanoIds.has(storageTranslation.nanoId)) {
      combinedTranslations.push(storageTranslation);
    }
  });

  return combinedTranslations;
};

const findSimilarTarget = (words, targets, similarity) => {
  if (!targets) {
    return null;
  }

  for (let i = 0; i < targets.length; i += 1) {
    const { origin } = targets[i];
    const includedRate = Math.floor(
      (words.length / origin.length).toFixed(DECIMAL_POINT) * PERCENTAGE,
    );

    if (includedRate >= similarity) {
      return targets[i];
    }
  }

  return null;
};

export const getTranslationFromChromeStorage = (translations, originText) => {
  const translationsIncludingOrigin = translations.filter(({ origin }) =>
    origin.includes(originText),
  );

  const translation = findSimilarTarget(
    originText,
    translationsIncludingOrigin,
    SIMILARITY,
  );

  return translation;
};

export const getTranslationFromServer = async ({ originText }) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(
    `${process.env.SERVER_URL + WORDS + TRANSLATED}?words=${originText}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.json();
};

export const getTranslationFromGoogleCloudAPI = async (
  { projectId },
  originText,
) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const BASE_URL = "https://translation.googleapis.com/v3/projects/";
  const URL_POST_FIX = "/locations/us-central1:translateText";

  const response = await fetch(BASE_URL + projectId + URL_POST_FIX, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      sourceLanguageCode: "en",
      targetLanguageCode: "ko",
      contents: originText.toLowerCase(),
      glossaryConfig: {
        glossary: `projects/${projectId}/locations/us-central1/glossaries/my-glossary`,
      },
    }),
  });

  return response.json();
};

export const getGlossaryFromGoogleCloudAPI = async ({ bucketId }) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const url = `https://storage.googleapis.com/storage/v1/b/${bucketId}/o/my-glossary.csv?alt=media`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseText = await response.text();

  if (
    responseText === `No such object: ${bucketId}/my-glossary.csv` ||
    responseText === "The specified bucket does not exist."
  ) {
    return null;
  }

  const wordPairs = responseText
    .split("\r\n")
    .map((wordPair) => wordPair.split(","));
  const glossary = wordPairs.reduce(
    (prev, [origin, target]) => ({ ...prev, [origin]: target }),
    {},
  );

  return glossary;
};

export const sendTranslationResult = async (
  { email },
  currentTranslationResult,
) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(
    `${process.env.SERVER_URL}${TRANSLATIONS}/${email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(currentTranslationResult),
    },
  );

  return response.json();
};

export const googleTranslate = async (user, originText) => {
  const translated = await getTranslationFromGoogleCloudAPI(user, originText);

  if (translated.error) {
    throw new Error("구글 API 번역 요청 중 에러가 발생했습니다.");
  }

  const { translatedText } = translated.glossaryTranslations[0];
  const currentUrl = await chromeStore.get("currentUrl");

  const currentTranslationResult = {
    origin: originText,
    translated: translatedText,
    url: currentUrl,
    glossary: user.glossary,
    createdAt: new Date().toISOString(),
    nanoId: nanoid(),
  };

  if (user.isServerOn) {
    const sendingTranslationResponse = await sendTranslationResult(
      user,
      currentTranslationResult,
    );

    if (sendingTranslationResponse.result !== "ok") {
      throw new Error("서버에 번역 결과를 저장하는데 실패했습니다.");
    }
  }

  if (user.translations.length >= 5) {
    user.translations.shift();
  }

  const newUserData = {
    ...user,
    translations: user.translations.concat(currentTranslationResult),
  };

  await chromeStore.set("userData", newUserData);

  return {
    translation: translatedText,
    notification: "구글 API",
    glossary: user.glossary,
  };
};

export const getTranslationResult = async (user, originText) => {
  const { translations, isServerOn } = user;
  const localTranslation = await getTranslationFromChromeStorage(
    translations,
    originText,
  );

  if (localTranslation) {
    return {
      translation: localTranslation.translated,
      notification: "로컬 스토리지",
      glossary: localTranslation.glossary,
    };
  }

  if (isServerOn) {
    const serverTranslation = await getTranslationFromServer({ originText });

    if (serverTranslation.result !== "ok") {
      throw serverTranslation.error.message;
    } else if (serverTranslation.result === "ok" && serverTranslation.data) {
      return {
        translation: serverTranslation.data.translated,
        notification: "서버",
        glossary: serverTranslation.data.glossary,
      };
    }
  }

  return googleTranslate(user, originText);
};
