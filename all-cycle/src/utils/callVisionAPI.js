import fetch from "node-fetch";

async function callVisionAPI(uri) {
  const body = {
    requests: [
      {
        image: { content: uri.slice(23) },
        features: [{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 }],
      },
    ],
  };

  try {
    const response = await fetch(process.env.GOOGLE_VISION_API_URL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const parsed = await response.json();

    return parsed;
  } catch (err) {
    return {
      result: false,
      error: err.message,
    };
  }
}

export default callVisionAPI;
