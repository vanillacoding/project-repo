const fetch = require("node-fetch");

const { googleVisionApiUrl } = require("../config");

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: { content: image },
        features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 }],
      },
    ],
  };

  const response = await fetch(googleVisionApiUrl, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const parsed = await response.json();

  if (Object.entries(parsed.responses[0]).length === 0) {
    return [];
  }

  return parsed.responses[0].textAnnotations[0].description;
}

module.exports = callGoogleVisionAsync;
