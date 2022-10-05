const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fetchToNotificationServer = async (information) => {
  try {
    const response = await fetch(`${process.env.PUSH_NOTIFICATION_URI}/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(information),
    });

    if (!response.ok) {
      throw Error("Interner Server Error");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

module.exports = fetchToNotificationServer;
