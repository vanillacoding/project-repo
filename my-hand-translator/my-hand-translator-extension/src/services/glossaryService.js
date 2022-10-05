import { PROJECT_API, STORAGE_API, STORAGE_UPLOAD_API } from "../constants/url";
import chromeIdentity from "../utils/chromeIdentity";

import { convertCsvToJson } from "../utils/convert";
import fetchData, { createAuthHeader } from "../utils/fetchData";

const GLOSSARY_NAME = "my-glossary";

export const getGlossaries = async (page, limit, keyword = "") => {
  const accessToken = await chromeIdentity.getAccessToken();
  const response = await fetch(
    `${process.env.SERVER_URL}/glossaries/?keywords=${keyword}&page=${page}&limit=${limit}`,
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

export const getCsvFromGoogleStorage = async ({ bucketId }, errorHandler) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const authHeader = createAuthHeader(accessToken);

  try {
    const response = await fetch(
      `${STORAGE_API}/${bucketId}/o/${GLOSSARY_NAME}.csv?alt=media`,
      {
        headers: { ...authHeader },
      },
    );
    let hasBucket = null;

    if (!response.ok) {
      const result = await response.text();

      if (result === `No such object: ${bucketId}/my-glossary.csv`) {
        return { hasBucket: true, glossaryData: {} };
      }

      if (result === "The specified bucket does not exist.") {
        return { hasBucket: false, glossaryData: {} };
      }
    }

    hasBucket = true;

    const bucketGlossaryData = await response.text();
    const glossaryData = convertCsvToJson(bucketGlossaryData);

    return { hasBucket, glossaryData };
  } catch (error) {
    return errorHandler(error.message);
  }
};

export const updateCsvFromGoogleStorage = async (
  { csv, bucketId },
  errorHandler,
) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const authHeader = createAuthHeader(accessToken);

  try {
    await fetch(
      `${STORAGE_UPLOAD_API}/${bucketId}/o?uploadType=media&name=${GLOSSARY_NAME}.csv`,
      {
        method: "POST",
        headers: {
          ...authHeader,
          "Content-Type": "text/plain; charset=utf-8",
        },
        body: csv,
      },
    );
  } catch (error) {
    errorHandler(error.message);
  }
};

export const getGlossaryFromServer = async (
  { userId, accessToken },
  errorHandler,
) => {
  const authHeader = createAuthHeader(accessToken);

  try {
    const { data, result } = await fetchData(
      `${process.env.SERVER_URL}/users/${userId}/glossary`,
      "GET",
      authHeader,
    );

    if (result !== "ok") {
      errorHandler(result.error.message);
    }

    return data;
  } catch (error) {
    return errorHandler(error.message);
  }
};

export const updateGlossaryFromServer = async (
  { glossaryId, glossary, accessToken },
  errorHandler,
) => {
  const authHeader = createAuthHeader(accessToken);

  try {
    const { result, error } = await fetchData(
      `${process.env.SERVER_URL}/glossaries/${glossaryId}`,
      "PATCH",
      authHeader,
      { glossary },
    );

    if (result === "error") {
      errorHandler(error.message);
    }
  } catch (error) {
    errorHandler(error.message);
  }
};

export const createBucket = async ({ bucketId, projectId }, errorHandler) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const authHeader = createAuthHeader(accessToken);

  const data = {
    name: bucketId,
    location: "asia-northeast3",
    storageClass: "Standard",
    iamConfiguration: {
      uniformBucketLevelAccess: {
        enabled: true,
      },
    },
  };

  try {
    const responseData = await fetchData(
      `${STORAGE_API}?project=${projectId}`,
      "POST",
      authHeader,
      data,
    );

    const { error } = responseData;

    if (error) {
      errorHandler(error.message);
    }
  } catch (error) {
    errorHandler(error.message);
  }
};

export const createGlossaryFromGoogleTranslation = async (
  { projectId, bucketId },
  errorHandler,
) => {
  const accessToken = await chromeIdentity.getAccessToken();
  const authHeader = createAuthHeader(accessToken);

  try {
    const deleteResult = await fetchData(
      `${PROJECT_API}/${projectId}/locations/us-central1/glossaries/${GLOSSARY_NAME}`,
      "DELETE",
      authHeader,
    );

    if (deleteResult.error) {
      errorHandler(deleteResult.error.message);
    }

    const data = {
      name: `projects/${projectId}/locations/us-central1/glossaries/${GLOSSARY_NAME}`,
      languagePair: {
        sourceLanguageCode: "en",
        targetLanguageCode: "ko",
      },
      inputConfig: {
        gcsSource: {
          inputUri: `gs://${bucketId}/${GLOSSARY_NAME}.csv`,
        },
      },
    };

    const createResult = await fetchData(
      `${PROJECT_API}/${projectId}/locations/us-central1/glossaries`,
      "POST",
      authHeader,
      data,
    );

    if (createResult.error) {
      errorHandler(createResult.error.message);
    }
  } catch (error) {
    errorHandler(error.message);
  }
};
